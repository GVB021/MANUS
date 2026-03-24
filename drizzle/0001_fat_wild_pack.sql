CREATE TABLE `banners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`imageUrl` text NOT NULL,
	`linkUrl` text,
	`isPromo` int DEFAULT 0,
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `banners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`moduleId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`videoUrl` text,
	`materials` text,
	`order` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `classes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `modules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`teacher` varchar(255) NOT NULL,
	`duration` varchar(64) NOT NULL,
	`description` text,
	`imageUrl` text,
	`level` enum('iniciante','intermediario','avancado') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `modules_id` PRIMARY KEY(`id`),
	CONSTRAINT `modules_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` varchar(64) NOT NULL,
	`title` varchar(255),
	`message` text,
	`relatedId` int,
	`isRead` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`firstName` varchar(255),
	`lastName` varchar(255),
	`phone` varchar(20),
	`city` varchar(255),
	`state` varchar(2),
	`bio` text,
	`experience` varchar(255),
	`specialty` varchar(255),
	`mainLanguage` varchar(64),
	`portfolioUrl` text,
	`moduleId` int,
	`enrollmentDate` timestamp DEFAULT (now()),
	`status` enum('active','inactive','completed') DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `takes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentId` int NOT NULL,
	`classId` int NOT NULL,
	`characterName` varchar(255) NOT NULL,
	`audioUrl` text NOT NULL,
	`duration` int,
	`qualityScore` int,
	`status` enum('draft','submitted','approved','rejected') DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`uploadedAt` timestamp,
	CONSTRAINT `takes_id` PRIMARY KEY(`id`)
);
