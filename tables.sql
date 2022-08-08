 CREATE DATABASE "shortly";

CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT 'now()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP DEFAULT 'now()',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);



CREATE TABLE "shortlys" (
	"id" serial NOT NULL,
	"shortlyUrl" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"contagem" bigint NOT NULL,
	"createdAt" TIMESTAMP DEFAULT 'now()',
	CONSTRAINT "shortlys_pk" PRIMARY KEY ("id")
);




ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "shortlys" ADD CONSTRAINT "shortlys_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



