CREATE TYPE "public"."status" AS ENUM('PARADO', 'EM ANDAMENTO', 'CONCLUIDA');--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"cor" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tarefas" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"descricao" text,
	"status" "status" DEFAULT 'PARADO' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tarefas_para_categorias" (
	"tarefa_id" integer NOT NULL,
	"categoria_id" integer NOT NULL,
	CONSTRAINT "tarefas_para_categorias_tarefa_id_categoria_id_pk" PRIMARY KEY("tarefa_id","categoria_id")
);
--> statement-breakpoint
ALTER TABLE "tarefas_para_categorias" ADD CONSTRAINT "tarefas_para_categorias_tarefa_id_tarefas_id_fk" FOREIGN KEY ("tarefa_id") REFERENCES "public"."tarefas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tarefas_para_categorias" ADD CONSTRAINT "tarefas_para_categorias_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE no action ON UPDATE no action;