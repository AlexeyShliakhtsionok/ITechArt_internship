using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data_Access_Layer.Migrations
{
    public partial class mediafilechange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_ProcedureTypes_ProcedureTypeId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Clients_ClientId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Materials_MaterialManufacturers_MaterialManufacturerManufacturerId",
                table: "Materials");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Employees_EmployeeId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Procedures_ProcedureId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Procedures_ProcedureTypes_ProcedureTypeId",
                table: "Procedures");

            migrationBuilder.AlterColumn<int>(
                name: "ProcedureTypeId",
                table: "Procedures",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProcedureId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsEmployeePhoto",
                table: "MediaFiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPromoPhoto",
                table: "MediaFiles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "MaterialManufacturerManufacturerId",
                table: "Materials",
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
                defaultValue: new DateTime(2022, 2, 26, 8, 51, 32, 556, DateTimeKind.Local).AddTicks(1793),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 2, 22, 16, 1, 14, 818, DateTimeKind.Local).AddTicks(7040));

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Feedbacks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProcedureTypeId",
                table: "Employees",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_ProcedureTypes_ProcedureTypeId",
                table: "Employees",
                column: "ProcedureTypeId",
                principalTable: "ProcedureTypes",
                principalColumn: "ProcedureTypeId",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Clients_ClientId",
                table: "Feedbacks",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_MaterialManufacturers_MaterialManufacturerManufacturerId",
                table: "Materials",
                column: "MaterialManufacturerManufacturerId",
                principalTable: "MaterialManufacturers",
                principalColumn: "ManufacturerId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Employees_EmployeeId",
                table: "Orders",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Procedures_ProcedureId",
                table: "Orders",
                column: "ProcedureId",
                principalTable: "Procedures",
                principalColumn: "ProcedureId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Procedures_ProcedureTypes_ProcedureTypeId",
                table: "Procedures",
                column: "ProcedureTypeId",
                principalTable: "ProcedureTypes",
                principalColumn: "ProcedureTypeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_ProcedureTypes_ProcedureTypeId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_Clients_ClientId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_Materials_MaterialManufacturers_MaterialManufacturerManufacturerId",
                table: "Materials");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Employees_EmployeeId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Procedures_ProcedureId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Procedures_ProcedureTypes_ProcedureTypeId",
                table: "Procedures");

            migrationBuilder.DropColumn(
                name: "IsEmployeePhoto",
                table: "MediaFiles");

            migrationBuilder.DropColumn(
                name: "IsPromoPhoto",
                table: "MediaFiles");

            migrationBuilder.AlterColumn<int>(
                name: "ProcedureTypeId",
                table: "Procedures",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProcedureId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "EmployeeId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "MaterialManufacturerManufacturerId",
                table: "Materials",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedOn",
                table: "Feedbacks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2022, 2, 22, 16, 1, 14, 818, DateTimeKind.Local).AddTicks(7040),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2022, 2, 26, 8, 51, 32, 556, DateTimeKind.Local).AddTicks(1793));

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Feedbacks",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProcedureTypeId",
                table: "Employees",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_ProcedureTypes_ProcedureTypeId",
                table: "Employees",
                column: "ProcedureTypeId",
                principalTable: "ProcedureTypes",
                principalColumn: "ProcedureTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_Clients_ClientId",
                table: "Feedbacks",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Materials_MaterialManufacturers_MaterialManufacturerManufacturerId",
                table: "Materials",
                column: "MaterialManufacturerManufacturerId",
                principalTable: "MaterialManufacturers",
                principalColumn: "ManufacturerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Clients_ClientId",
                table: "Orders",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Employees_EmployeeId",
                table: "Orders",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Procedures_ProcedureId",
                table: "Orders",
                column: "ProcedureId",
                principalTable: "Procedures",
                principalColumn: "ProcedureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Procedures_ProcedureTypes_ProcedureTypeId",
                table: "Procedures",
                column: "ProcedureTypeId",
                principalTable: "ProcedureTypes",
                principalColumn: "ProcedureTypeId");
        }
    }
}
