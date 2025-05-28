import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResponse } from '../../domain/dtos/paginationResponse.dto';

@Injectable()
export class PrismaGenericService<T, C, R, U, D, F> {
  internalServerErrorException = `Server Error: An internal server error occurred 
                              processing the request`;
  badRequestException = 'The id does not exist';
  model;
  filter = (id: string) => {
    return { where: { id: id } };
  };

  companyFilter = (id: string, companyId: string) => {
    return { where: { id: id, companyId } };
  };

  constructor(model) {
    this.model = model;
  }

  async create(createArgs: C): Promise<T> {
    try {
      return await this.model.create(createArgs);
    } catch (e) {
      this.managerError(e);
    }
  }

  async count(filter): Promise<number> {
    try {
      return await this.model.count(filter);
    } catch (e) {
      this.managerError(e);
    }
  }

  async findAll(findArgs: any): Promise<PaginatedResponse<T>> {
    const { take, skip, select, include, ...filter } = findArgs;
    const totalResults = await this.count(filter);

    try {
      const data = await this.model.findMany(findArgs);
      const totalPages = Math.ceil(totalResults / take);
      const currentPage = Math.floor(skip / take) + 1;

      return {
        data,
        pageInfo: {
          currentPage,
          totalPages,
          totalResults,
        },
      };
    } catch (e) {
      this.managerError(e);
    }
  }

  async findOne(findOneArgs: R): Promise<T> {
    let item;
    try {
      item = await this.model.findUnique(findOneArgs);
    } catch (e) {
      this.managerError(e);
    }
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(findOneArgs: R, updateArgs: U): Promise<T> {
    const res = await this.findOne(findOneArgs);

    try {
      return await this.model.update(updateArgs);
    } catch (e) {
      this.managerError(e);
    }
  }

  async remove(findOneArgs: R, removeArgs: D): Promise<T> {
    try {
      await this.findOne(findOneArgs);
      return await this.model.delete(removeArgs);
    } catch (e) {
      this.managerError(e);
    }
  }

  managerError(exception) {
    let status = 500;
    let message = 'An unexpected error occurred';
    console.log(exception);

    if (!exception.code) {
      message = 'Validation error: ';
      status = 400;
    } else {
      switch (exception.code) {
        case 'P2002':
          status = 400;
          message =
            'Unique constraint failed, please ensure all required fields are unique.';
          break;
        case 'P2003':
          status = 400;
          message =
            'Foreign key constraint failed, please ensure the related record exists.';
          break;
        case 'P2004':
          status = 400;
          message =
            'A constraint failed on the database, please ensure all field constraints are met.';
          break;
        case 'P2018':
          message =
            'Required parameters are missing or the id of a nested parameter does not exist. Please ensure all required fields are provided or the id of a nested parameter does exist.';
          status = 400;
          break;
        case 'P2021':
          message = 'Item not found.';
          status = 400;
          break;
        case 'P2025':
          status = 400;
          message =
            'Record to delete does not exist or the id of a nested parameter does not exist.';
          break;
        default:
          console.error('Unhandled Prisma error: ', exception);
          break;
      }
    }

    // Lanzamos una excepción HTTP con el mensaje y el código de estado
    throw new HttpException(
      {
        statusCode: status,
        message: message,
      },
      status
    );
  }
}
