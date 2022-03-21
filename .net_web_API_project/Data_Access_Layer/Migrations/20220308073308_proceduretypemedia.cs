using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data_Access_Layer.Migrations
{
    public partial class proceduretypemedia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MediaFileFileId",
                table: "ProcedureTypes",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPromoPhoto",
                table: "MediaFiles",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "IsEmployeePhoto",
                table: "MediaFiles",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "Feedbacks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 3, 8, 10, 33, 8, 709, DateTimeKind.Local).AddTicks(9588),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 2, 26, 8, 51, 32, 556, DateTimeKind.Local).AddTicks(1793));

            migrationBuilder.CreateIndex(
                name: "IX_ProcedureTypes_MediaFileFileId",
                table: "ProcedureTypes",
                column: "MediaFileFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProcedureTypes_MediaFiles_MediaFileFileId",
                table: "ProcedureTypes",
                column: "MediaFileFileId",
                principalTable: "MediaFiles",
                principalColumn: "FileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProcedureTypes_MediaFiles_MediaFileFileId",
                table: "ProcedureTypes");

            migrationBuilder.DropIndex(
                name: "IX_ProcedureTypes_MediaFileFileId",
                table: "ProcedureTypes");

            migrationBuilder.DropColumn(
                name: "MediaFileFileId",
                table: "ProcedureTypes");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPromoPhoto",
                table: "MediaFiles",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<bool>(
                name: "IsEmployeePhoto",
                table: "MediaFiles",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "Feedbacks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 2, 26, 8, 51, 32, 556, DateTimeKind.Local).AddTicks(1793),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 3, 8, 10, 33, 8, 709, DateTimeKind.Local).AddTicks(9588));
        }
    }
}
