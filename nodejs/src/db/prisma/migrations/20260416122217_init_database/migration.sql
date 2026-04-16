-- CreateTable
CREATE TABLE `tarefas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `status` ENUM('PARADO', 'EM_ANDAMENTO', 'CONCLUIDA') NOT NULL DEFAULT 'PARADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TarefaParaCategoria` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TarefaParaCategoria_AB_unique`(`A`, `B`),
    INDEX `_TarefaParaCategoria_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TarefaParaCategoria` ADD CONSTRAINT `_TarefaParaCategoria_A_fkey` FOREIGN KEY (`A`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TarefaParaCategoria` ADD CONSTRAINT `_TarefaParaCategoria_B_fkey` FOREIGN KEY (`B`) REFERENCES `tarefas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
