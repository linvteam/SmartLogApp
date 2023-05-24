using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartLogStatistics.Migrations
{
    public partial class AggiuntaUniteSubunitLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "subunit",
                table: "Log",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "unit",
                table: "Log",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "subunit",
                table: "Log");

            migrationBuilder.DropColumn(
                name: "unit",
                table: "Log");
        }
    }
}
