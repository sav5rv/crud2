CREATE TABLE `tb_aluno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `uf` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tb_pergunta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grupo` varchar(150) DEFAULT NULL,
  `pergunta` varchar(150) DEFAULT NULL,
  `fk_profissional` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_grupo` (`grupo`),
  KEY `fk_prof_idx` (`fk_profissional`),
  CONSTRAINT `fk_prof` FOREIGN KEY (`fk_profissional`) REFERENCES `tb_profissional` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tb_profissional` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) DEFAULT NULL,
  `especialidade` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tb_resposta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resposta` varchar(255) DEFAULT NULL,
  `criadoEm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `alteradoEm` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idx_pergunta` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `idx_pergunta` FOREIGN KEY (`id`) REFERENCES `tb_pergunta` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
