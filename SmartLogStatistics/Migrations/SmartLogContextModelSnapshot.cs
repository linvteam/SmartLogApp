﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using SmartLogStatistics.Repository;

#nullable disable

namespace SmartLogStatistics.Migrations
{
    [DbContext(typeof(SmartLogContext))]
    partial class SmartLogContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("SmartLogStatistics.Model.Event", b =>
                {
                    b.Property<string>("code")
                        .HasColumnType("text");

                    b.Property<string>("color")
                        .IsRequired()
                        .HasMaxLength(9)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("code");

                    b.ToTable("Event", (string)null);
                });

            modelBuilder.Entity("SmartLogStatistics.Model.Firmware", b =>
                {
                    b.Property<int>("file_id")
                        .HasColumnType("integer");

                    b.Property<int>("unit")
                        .HasColumnType("integer");

                    b.Property<int>("subunit")
                        .HasColumnType("integer");

                    b.Property<string>("INI_file_name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("file_id", "unit", "subunit");

                    b.ToTable("Firmware", (string)null);
                });

            modelBuilder.Entity("SmartLogStatistics.Model.Log", b =>
                {
                    b.Property<int>("file_id")
                        .HasColumnType("integer");

                    b.Property<int>("log_line")
                        .HasColumnType("integer");

                    b.Property<string>("code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateOnly>("date")
                        .HasColumnType("date");

                    b.Property<int>("subunit")
                        .HasColumnType("integer");

                    b.Property<TimeOnly>("time")
                        .HasColumnType("time without time zone");

                    b.Property<int>("unit")
                        .HasColumnType("integer");

                    b.Property<bool>("value")
                        .HasColumnType("boolean");

                    b.HasKey("file_id", "log_line");

                    b.HasIndex("code");

                    b.ToTable("Log", (string)null);
                });

            modelBuilder.Entity("SmartLogStatistics.Model.LogFile", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("id"));

                    b.Property<DateTime>("PC_datetime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("UPS_datetime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("filename")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("id");

                    b.ToTable("File", (string)null);
                });

            modelBuilder.Entity("SmartLogStatistics.Model.Firmware", b =>
                {
                    b.HasOne("SmartLogStatistics.Model.LogFile", "LogFile")
                        .WithMany("Firmwares")
                        .HasForeignKey("file_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LogFile");
                });

            modelBuilder.Entity("SmartLogStatistics.Model.Log", b =>
                {
                    b.HasOne("SmartLogStatistics.Model.Event", "Event")
                        .WithMany("Logs")
                        .HasForeignKey("code")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SmartLogStatistics.Model.LogFile", "LogFile")
                        .WithMany("Logs")
                        .HasForeignKey("file_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("LogFile");
                });

            modelBuilder.Entity("SmartLogStatistics.Model.Event", b =>
                {
                    b.Navigation("Logs");
                });

            modelBuilder.Entity("SmartLogStatistics.Model.LogFile", b =>
                {
                    b.Navigation("Firmwares");

                    b.Navigation("Logs");
                });
#pragma warning restore 612, 618
        }
    }
}
