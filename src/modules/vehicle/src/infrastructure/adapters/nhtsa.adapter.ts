import { HttpService } from "@nestjs/axios";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom, map } from "rxjs";

@Injectable()
export default class NHTSAdapter {

    private readonly baseUrl = "https://vpic.nhtsa.dot.gov/api/vehicles";
    private readonly logger = new Logger(NHTSAdapter.name);

    public constructor(
        @Inject(HttpService)
        private readonly httpService: HttpService,
    ) { };

    public async getAllManufacturers(

    ) {

        const url = `${this.baseUrl}/getallmanufacturers?format=json`;

        this.logger.debug(`Consultando API en: ${url}`);

        try {

            const response: {
                Count: number,
                Message: string,
                Results: Array<
                    {
                        Country: string,
                        Mfr_CommonName: string,
                        Mfr_ID: number,
                        Mfr_Name: string,
                        VehicleTypes: [],
                    }

                >
            } = await firstValueFrom(

                this.httpService.get(url).pipe(

                    map(response => response.data || []),

                    catchError(
                        (error: AxiosError) => {
                            this.logger.error(
                                'Error en la API:',
                                {
                                    url: error.config?.url,
                                    status: error.response?.status,
                                    data: error.response?.data
                                }
                            );

                            throw new Error(`err at get manufacturers: ${error.message}`);

                        }
                    )
                )
            );

            return response.Results.map(e => { return { name: e.Mfr_Name, manufacturerId: e.Mfr_ID.toString() }; });

        } catch (error) {

            this.logger.error(
                'Error en getAllManufacturers:',
                error.message
            );

            throw error;

        };

    };

    public async getAllMakes() {

        const url = `${this.baseUrl}/getallmakes?format=json`;

        this.logger.debug(`consuming API... at: ${url}`);

        try {

            const response: {
                Count: number,
                Message: string,
                Results: Array<
                    {
                        Make_ID: number,
                        Make_Name: string,
                    }

                >
            } = await firstValueFrom(

                this.httpService.get(url).pipe(

                    map(response => response.data || []),

                    catchError(
                        (error: AxiosError) => {
                            this.logger.error(
                                'err at API:',
                                {
                                    url: error.config?.url,
                                    status: error.response?.status,
                                    data: error.response?.data
                                }
                            );

                            throw new Error(`error getting marks: ${error.message}`);

                        }
                    )
                )
            );

            return response.Results.map(e => { return { name: e.Make_Name, makeId: e.Make_ID.toString() }; });

        } catch (error) {

            this.logger.error(
                'err at getAllMakes:',
                error.message
            );

            throw error;

        };

    };

    public async getModelsByMakeIdAndYear(
        params: {
            makeId: string,
            year: number,
        }
    ) {

        const {
            makeId,
            year,
        } = params;

        const url = `${this.baseUrl}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;

        this.logger.debug(`consuming API... at: ${url}`);

        try {

            const response: {
                Count: number,
                Message: string,
                Results: Array<
                    {
                        Make_ID: number,
                        Make_Name: string,
                        Model_ID: number,
                        Model_Name: string,
                    }
                >
            } = await firstValueFrom(

                this.httpService.get(url).pipe(

                    map(response => response.data || []),

                    catchError(
                        (error: AxiosError) => {
                            this.logger.error(
                                'err at API:',
                                {
                                    url: error.config?.url,
                                    status: error.response?.status,
                                    data: error.response?.data
                                }
                            );

                            throw new Error(`error getting models: ${error.message}`);

                        }
                    )
                )
            );

            return response.Results?.map(e => { return { name: e.Model_Name }; });

        } catch (error) {

            this.logger.error(
                'err at getModelsByMakeIdAndYear:',
                error.message
            );

            throw error;

        };

    };

};