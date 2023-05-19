using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLogStatistics.Migrations
{
    public partial class PassaggiodaTimestampaDateTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UPS_datetime",
                table: "File",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "PC_datetime",
                table: "File",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "bytea",
                oldRowVersion: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "UPS_datetime",
                table: "File",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<byte[]>(
                name: "PC_datetime",
                table: "File",
                type: "bytea",
                rowVersion: true,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");
        }
    }
}
