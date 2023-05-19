using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLogStatistics.Migrations
{
    public partial class PassaggiodaDateTimeaDateOnly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<DateOnly>(
            //    name: "time",
            //    table: "Log",
            //    type: "date",
            //    nullable: false,
            //    oldClrType: typeof(DateTime),
            //    oldType: "timestamp with time zone");

            //migrationBuilder.AlterColumn<DateOnly>(
            //    name: "date",
            //    table: "Log",
            //    type: "date",
            //    nullable: false,
            //    oldClrType: typeof(DateTime),
            //    oldType: "timestamp with time zone");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<DateTime>(
            //    name: "time",
            //    table: "Log",
            //    type: "timestamp with time zone",
            //    nullable: false,
            //    oldClrType: typeof(DateOnly),
            //    oldType: "date");

            //migrationBuilder.AlterColumn<DateTime>(
            //    name: "date",
            //    table: "Log",
            //    type: "timestamp with time zone",
            //    nullable: false,
            //    oldClrType: typeof(DateOnly),
            //    oldType: "date");
        }
    }
}
