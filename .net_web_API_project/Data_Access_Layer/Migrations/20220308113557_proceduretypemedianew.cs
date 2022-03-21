using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data_Access_Layer.Migrations
{
    public partial class proceduretypemedianew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaFiles_Employees_EmployeeId",
                table: "MediaFiles");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "MediaFiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "Feedbacks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 3, 8, 14, 35, 57, 160, DateTimeKind.Local).AddTicks(5277),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 3, 8, 10, 33, 8, 709, DateTimeKind.Local).AddTicks(9588));

            migrationBuilder.AddForeignKey(
                name: "FK_MediaFiles_Employees_EmployeeId",
                table: "MediaFiles",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaFiles_Employees_EmployeeId",
                table: "MediaFiles");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "MediaFiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "Feedbacks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 3, 8, 10, 33, 8, 709, DateTimeKind.Local).AddTicks(9588),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 3, 8, 14, 35, 57, 160, DateTimeKind.Local).AddTicks(5277));

            migrationBuilder.AddForeignKey(
                name: "FK_MediaFiles_Employees_EmployeeId",
                table: "MediaFiles",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
