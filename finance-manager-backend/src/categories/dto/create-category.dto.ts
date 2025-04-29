import { ApiProperty } from "@nestjs/swagger";
export class CreateCategoryDto {
    @ApiProperty({example: 'Groceries'})
    title: string;
    // userId: number; 
}
