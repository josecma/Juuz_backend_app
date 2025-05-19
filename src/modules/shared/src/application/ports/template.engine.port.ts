export default interface TemplateEnginePort {
    compile(
        params: {
            templatesDir: string;
            templateName: string;
            data: Record<string, unknown>;
        },
    ): string;
};