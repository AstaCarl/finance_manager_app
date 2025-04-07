"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatedEntry1740404273692 = void 0;
class CreatedEntry1740404273692 {
    constructor() {
        this.name = 'CreatedEntry1740404273692';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "amount" integer NOT NULL, "date" TIMESTAMP NOT NULL, "categoryId" integer, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5e1c00d1bf0d7f449fbd257d3c8"`);
        await queryRunner.query(`DROP TABLE "entry"`);
    }
}
exports.CreatedEntry1740404273692 = CreatedEntry1740404273692;
//# sourceMappingURL=1740404273692-CreatedEntry.js.map