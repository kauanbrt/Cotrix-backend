-- CreateTable
CREATE TABLE "Administrador" (
    "id_adm" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_adm" TEXT NOT NULL,
    "email_adm" TEXT NOT NULL,
    "tel_adm" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Participante" (
    "id_participante" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_participante" TEXT NOT NULL,
    "email_participante" TEXT NOT NULL,
    "RA_participante" TEXT NOT NULL,
    "tel_participante" TEXT NOT NULL,
    "isAluno" BOOLEAN NOT NULL,
    "id_adm" INTEGER,
    CONSTRAINT "Participante_id_adm_fkey" FOREIGN KEY ("id_adm") REFERENCES "Administrador" ("id_adm") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Evento" (
    "id_evento" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_evento" TEXT NOT NULL,
    "data_inicio" DATETIME NOT NULL,
    "data_fim" DATETIME NOT NULL,
    "descricao_evento" TEXT NOT NULL,
    "id_adm" INTEGER NOT NULL,
    "qtd_participantes" INTEGER NOT NULL,
    "duracao" INTEGER NOT NULL,
    "classificacao_evento" INTEGER NOT NULL,
    CONSTRAINT "Evento_id_adm_fkey" FOREIGN KEY ("id_adm") REFERENCES "Administrador" ("id_adm") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Formulario" (
    "id_formulario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_evento" INTEGER NOT NULL,
    "id_adm" INTEGER NOT NULL,
    "id_tipo" INTEGER NOT NULL,
    "nome_formulario" TEXT NOT NULL,
    "status_formulario" BOOLEAN NOT NULL,
    CONSTRAINT "Formulario_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Evento" ("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Formulario_id_adm_fkey" FOREIGN KEY ("id_adm") REFERENCES "Administrador" ("id_adm") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Formulario_id_tipo_fkey" FOREIGN KEY ("id_tipo") REFERENCES "Tipo" ("id_tipo") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tipo" (
    "id_tipo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id_evento" INTEGER NOT NULL,
    "id_participante" INTEGER NOT NULL,
    "descricao_feedback" TEXT NOT NULL,
    "classificacao_feedback" INTEGER NOT NULL,

    PRIMARY KEY ("id_evento", "id_participante"),
    CONSTRAINT "Feedback_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Evento" ("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Feedback_id_participante_fkey" FOREIGN KEY ("id_participante") REFERENCES "Participante" ("id_participante") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificado" (
    "id_certificado" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_evento" INTEGER NOT NULL,
    "id_participante" INTEGER NOT NULL,
    "status_certificado" BOOLEAN NOT NULL,
    CONSTRAINT "Certificado_id_evento_fkey" FOREIGN KEY ("id_evento") REFERENCES "Evento" ("id_evento") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Certificado_id_participante_fkey" FOREIGN KEY ("id_participante") REFERENCES "Participante" ("id_participante") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EventoToParticipante" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EventoToParticipante_A_fkey" FOREIGN KEY ("A") REFERENCES "Evento" ("id_evento") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EventoToParticipante_B_fkey" FOREIGN KEY ("B") REFERENCES "Participante" ("id_participante") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventoToParticipante_AB_unique" ON "_EventoToParticipante"("A", "B");

-- CreateIndex
CREATE INDEX "_EventoToParticipante_B_index" ON "_EventoToParticipante"("B");
