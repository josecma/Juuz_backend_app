import { ApiProperty } from "@nestjs/swagger";

export class LocationEvidenceSchema {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: "456" })
    orderId: string;

    @ApiProperty({
        example: { longitude: "-73.935242", latitude: "40.730610" },
        description: "location coords",
    })
    coords: { longitude: string; latitude: string };

    @ApiProperty({ example: ["photo1.jpg", "photo2.jpg"], description: "photo urls" })
    photos: string[];
}


