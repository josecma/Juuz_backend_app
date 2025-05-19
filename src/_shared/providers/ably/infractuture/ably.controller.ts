import { BadRequestException, Controller, Inject, InternalServerErrorException, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestUserId } from 'src/_shared/domain/requestId';
import GetPrivateUserChannelByUserIdUseCase from 'src/modules/shared/src/application/useCases/get.private.user.channel.by.user.id.use.case';
import BadRequestDomainException from 'src/modules/shared/src/domain/exceptions/bad.request.domain.exception';

@ApiTags('Ably')
@Controller({
  path: 'ably/',
  version: '1',
})
export class AblyController {
  constructor(
    @Inject(GetPrivateUserChannelByUserIdUseCase)
    private readonly getPrivateUserChannelByUserIdUseCase: GetPrivateUserChannelByUserIdUseCase,
  ) { }

  @Post('token')
  public async getToken(
    @Request() req: RequestUserId,
  ) {

    try {

      const userTokenWithChannels = await this.getPrivateUserChannelByUserIdUseCase.execute({
        userId: req.user.id.toString(),
      });

      return userTokenWithChannels;

    } catch (error) {
      if (error instanceof BadRequestDomainException) {
        throw new BadRequestException(`${error.message}`);
      }
      throw new InternalServerErrorException(error);
    };
  };

  // @Post('')
  // async sendMessage(@Body() body: { channel: string; message: any }) {
  //   const { channel, message } = body;
  //   await this.ablyService.sendMessage(channel, message);
  //   return { success: true };
  // }
}
