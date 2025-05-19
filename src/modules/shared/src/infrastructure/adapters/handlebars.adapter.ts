import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import { join } from 'path';
import TemplateEnginePort from "../../application/ports/template.engine.port";

export default class HandlebarsAdapter implements TemplateEnginePort {

    private readonly logger = new Logger(HandlebarsAdapter.name);

    public compile(
        params: {
            templatesDir: string;
            templateName: string;
            data: Record<string, unknown>;
        },
    ): string {

        const {
            templatesDir,
            templateName,
            data,
        } = params;

        try {

            const templatePath = join(templatesDir, `${templateName}.hbs`);

            const templateSource = readFileSync(templatePath, 'utf-8');

            const template = handlebars.compile(templateSource);

            return template(data);

        } catch (error) {

            this.logger.error(error);
            throw error;

        };

    };

};