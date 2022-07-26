USE [master]
GO
/****** Object:  Database [PiWork]    Script Date: 8/29/2022 10:15:06 PM ******/
CREATE DATABASE [PiWork]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'FreelanceCodingJobs', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\FreelanceCodingJobs.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'FreelanceCodingJobs_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\FreelanceCodingJobs_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [PiWork] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PiWork].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PiWork] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PiWork] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PiWork] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PiWork] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PiWork] SET ARITHABORT OFF 
GO
ALTER DATABASE [PiWork] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PiWork] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PiWork] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PiWork] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PiWork] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PiWork] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PiWork] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PiWork] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PiWork] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PiWork] SET  ENABLE_BROKER 
GO
ALTER DATABASE [PiWork] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PiWork] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PiWork] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PiWork] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PiWork] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PiWork] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PiWork] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PiWork] SET RECOVERY FULL 
GO
ALTER DATABASE [PiWork] SET  MULTI_USER 
GO
ALTER DATABASE [PiWork] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PiWork] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PiWork] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PiWork] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PiWork] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PiWork] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'PiWork', N'ON'
GO
ALTER DATABASE [PiWork] SET QUERY_STORE = OFF
GO
USE [PiWork]
GO
/****** Object:  Schema [Administration]    Script Date: 8/29/2022 10:15:06 PM ******/
CREATE SCHEMA [Administration]
GO
/****** Object:  Schema [App]    Script Date: 8/29/2022 10:15:06 PM ******/
CREATE SCHEMA [App]
GO
/****** Object:  Schema [Work]    Script Date: 8/29/2022 10:15:06 PM ******/
CREATE SCHEMA [Work]
GO
/****** Object:  UserDefinedTableType [dbo].[TvpJobSkills]    Script Date: 8/29/2022 10:15:06 PM ******/
CREATE TYPE [dbo].[TvpJobSkills] AS TABLE(
	[SkillId] [int] NOT NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TvpJobTechnologies]    Script Date: 8/29/2022 10:15:06 PM ******/
CREATE TYPE [dbo].[TvpJobTechnologies] AS TABLE(
	[TechnologyId] [int] NOT NULL
)
GO
/****** Object:  UserDefinedFunction [Administration].[fun_User_CheckIfUserExists]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Administration].[fun_User_CheckIfUserExists]
(
    @email NVARCHAR(200)
)
RETURNS BIT
AS
BEGIN
    DECLARE @exists BIT;
    DECLARE @rowCount TINYINT;

    SELECT @rowCount = COUNT(*)
    FROM Administration.[User] AS u
    WHERE u.Email = @email;

    IF @rowCount <> 0
        SET @exists = 1;
    ELSE
        SET @exists = 0;

    RETURN @exists;
END;

GO
/****** Object:  Table [Work].[Job]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[Job](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](500) NOT NULL,
	[Description] [nvarchar](2000) NOT NULL,
	[SourceCodeLink] [nvarchar](2000) NULL,
	[EstimatedDays] [int] NULL,
	[ContactEmail] [nvarchar](200) NULL,
	[PublishedByUserId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[InsertDate] [date] NOT NULL,
	[InsertBy] [int] NOT NULL,
	[UpdateDate] [date] NULL,
	[UpdateBy] [int] NULL,
	[PriceAmount] [decimal](10, 4) NULL,
 CONSTRAINT [pk_Job_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [Work].[vw_JobGeneralInfo]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [Work].[vw_JobGeneralInfo]
AS
SELECT j.Id,
       j.Title,
       j.PriceAmount,
	   j.Description,
	   j.IsActive, -- as status to show
	   j.InsertDate
FROM Work.Job AS j
GO
/****** Object:  Table [Administration].[Role]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](200) NULL,
 CONSTRAINT [pk_Role_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Administration].[User]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Administration].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[LastName] [nvarchar](100) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[RoleId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[InsertDate] [date] NULL,
	[InsertBy] [int] NULL,
	[UpdateDate] [date] NULL,
	[UpdateBy] [int] NULL,
	[ProfilePic] [varchar](400) NULL,
	[Password] [binary](64) NOT NULL,
 CONSTRAINT [pk_User_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [Administration].[vw_User_TokenAuthenticationInfo]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [Administration].[vw_User_TokenAuthenticationInfo]
AS
SELECT u.Id,
       u.FirstName,
       u.LastName,
       u.Email,
       r.Name AS Role
	   FROM Administration.[User] AS u
	   INNER JOIN Administration.Role AS r ON r.Id = u.RoleId


GO
/****** Object:  Table [App].[Config]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Config](
	[Key] [varchar](200) NOT NULL,
	[Value] [nvarchar](2000) NOT NULL,
	[InsertDate] [date] NOT NULL,
	[InsertBy] [int] NOT NULL,
	[UpdateDate] [date] NULL,
	[UpdateBy] [int] NULL,
 CONSTRAINT [pk_Config_Key] PRIMARY KEY CLUSTERED 
(
	[Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[Error]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[Error](
	[Id] [varchar](20) NOT NULL,
	[Description] [nvarchar](1000) NULL,
	[StatusCode] [int] NULL,
 CONSTRAINT [pk_Error_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [App].[ErrorsLog]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [App].[ErrorsLog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ErrorId] [varchar](20) NOT NULL,
	[InsertDate] [date] NOT NULL,
	[InsertBy] [int] NULL,
 CONSTRAINT [pk_ErrorsLog_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[Experience]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[Experience](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkplaceName] [nvarchar](500) NOT NULL,
	[Description] [nvarchar](1000) NOT NULL,
	[UserId] [int] NOT NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
 CONSTRAINT [pk_Experience_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[JobApplication]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[JobApplication](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AppliedByUserId] [int] NOT NULL,
	[JobId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[InsertDate] [date] NOT NULL,
	[InsertBy] [int] NOT NULL,
	[UpdateDate] [date] NULL,
	[UpdateBy] [int] NULL,
	[Comment] [nvarchar](800) NOT NULL,
	[JobApplicationPhaseId] [varchar](100) NOT NULL,
 CONSTRAINT [pk_JobApplications_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[JobApplicationPhase]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[JobApplicationPhase](
	[Id] [varchar](100) NOT NULL,
	[Description] [varchar](1000) NOT NULL,
 CONSTRAINT [pk_JobApplicationPhase_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[JobSkills]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[JobSkills](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[JobId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
 CONSTRAINT [pk_JobSkills_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[Notification]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[Notification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[NotificationTopicId] [varchar](100) NOT NULL,
	[IsSent] [bit] NULL,
	[IsRead] [bit] NULL,
	[Message] [nvarchar](1000) NOT NULL,
	[InsertDate] [datetime] NOT NULL,
	[Picture] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[NotificationTopic]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[NotificationTopic](
	[Id] [varchar](100) NULL,
	[Description] [varchar](150) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[Skill]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[Skill](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Description] [nvarchar](500) NOT NULL,
	[Icon] [varchar](500) NULL,
 CONSTRAINT [pk_Skill_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Work].[UserSkills]    Script Date: 8/29/2022 10:15:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Work].[UserSkills](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
 CONSTRAINT [pk_UserSkill_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [Administration].[Role] ON 

INSERT [Administration].[Role] ([Id], [Name], [Description]) VALUES (1, N'Recruiter', NULL)
INSERT [Administration].[Role] ([Id], [Name], [Description]) VALUES (2, N'Seeker', NULL)
SET IDENTITY_INSERT [Administration].[Role] OFF
GO
INSERT [App].[Config] ([Key], [Value], [InsertDate], [InsertBy], [UpdateDate], [UpdateBy]) VALUES (N'contry', N'Kosova', CAST(N'2022-07-25' AS Date), -1, NULL, NULL)
INSERT [App].[Config] ([Key], [Value], [InsertDate], [InsertBy], [UpdateDate], [UpdateBy]) VALUES (N'string', N'string', CAST(N'2022-07-28' AS Date), 1, NULL, NULL)
INSERT [App].[Config] ([Key], [Value], [InsertDate], [InsertBy], [UpdateDate], [UpdateBy]) VALUES (N'test', N'testtt', CAST(N'2022-07-30' AS Date), 1, NULL, NULL)
GO
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_01', N'Something went wrong', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_02', N'Failed to delete item', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_03', N'Technology is already registered for this user', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_04', N'User already exists', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_05', N'User does not exists', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_06', N'Job does not exists', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_07', N'An error occurred while inserting this job', 500)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_08', N'Incorrect password', 400)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_09', N'No data found', 404)
INSERT [App].[Error] ([Id], [Description], [StatusCode]) VALUES (N'ERR_10', N'Input fields are invalid!', NULL)
GO
SET IDENTITY_INSERT [App].[ErrorsLog] ON 

INSERT [App].[ErrorsLog] ([Id], [ErrorId], [InsertDate], [InsertBy]) VALUES (1, N'ERR_01', CAST(N'2022-07-13' AS Date), -1)
SET IDENTITY_INSERT [App].[ErrorsLog] OFF
GO
INSERT [Work].[JobApplicationPhase] ([Id], [Description]) VALUES (N'Choosen', N'When job publisher choose a candidate')
INSERT [Work].[JobApplicationPhase] ([Id], [Description]) VALUES (N'Rejected', N'When job publisher reject a candidate')
INSERT [Work].[JobApplicationPhase] ([Id], [Description]) VALUES (N'Waiting', N'When job publisher did not select best candidate')
GO
INSERT [Work].[NotificationTopic] ([Id], [Description]) VALUES (N'JobApply', N'New job application')
INSERT [Work].[NotificationTopic] ([Id], [Description]) VALUES (N'ApplicantApprove', N'Job application has been approved')
INSERT [Work].[NotificationTopic] ([Id], [Description]) VALUES (N'ApplicantRefuse', N'Job application has been refused')
GO
SET IDENTITY_INSERT [Work].[Skill] ON 

INSERT [Work].[Skill] ([Id], [Name], [Description], [Icon]) VALUES (1, N'Angular', N'Javascript framework', N'icons/angular.png')
INSERT [Work].[Skill] ([Id], [Name], [Description], [Icon]) VALUES (2, N'NestJS', N'No info.', N'icons/nestjs.png')
INSERT [Work].[Skill] ([Id], [Name], [Description], [Icon]) VALUES (3, N'Front-end', N'', N'icons/frontend.jpg')
INSERT [Work].[Skill] ([Id], [Name], [Description], [Icon]) VALUES (4, N'Back-end', N'', N'icons/backend.jpg')
SET IDENTITY_INSERT [Work].[Skill] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Config__C41E028972050AE6]    Script Date: 8/29/2022 10:15:07 PM ******/
ALTER TABLE [App].[Config] ADD UNIQUE NONCLUSTERED 
(
	[Key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [Administration].[User] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Administration].[User] ADD  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [Administration].[User] ADD  DEFAULT ((-1)) FOR [InsertBy]
GO
ALTER TABLE [App].[Config] ADD  CONSTRAINT [DF__Config__InsertDa__5BE2A6F2]  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [App].[Config] ADD  CONSTRAINT [DF__Config__InsertBy__5CD6CB2B]  DEFAULT ((-1)) FOR [InsertBy]
GO
ALTER TABLE [App].[ErrorsLog] ADD  CONSTRAINT [DF__ErrorsLog__Inser__656C112C]  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [Work].[Job] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Work].[Job] ADD  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [Work].[JobApplication] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [Work].[JobApplication] ADD  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [Work].[Notification] ADD  DEFAULT (getdate()) FOR [InsertDate]
GO
ALTER TABLE [Administration].[User]  WITH CHECK ADD  CONSTRAINT [fk_User_Role_RoleId] FOREIGN KEY([RoleId])
REFERENCES [Administration].[Role] ([Id])
GO
ALTER TABLE [Administration].[User] CHECK CONSTRAINT [fk_User_Role_RoleId]
GO
ALTER TABLE [App].[ErrorsLog]  WITH CHECK ADD  CONSTRAINT [fk_ErrorsLog_Error_ErrorId] FOREIGN KEY([ErrorId])
REFERENCES [App].[Error] ([Id])
GO
ALTER TABLE [App].[ErrorsLog] CHECK CONSTRAINT [fk_ErrorsLog_Error_ErrorId]
GO
ALTER TABLE [Work].[Experience]  WITH CHECK ADD  CONSTRAINT [fk_Experience_User_UserId] FOREIGN KEY([UserId])
REFERENCES [Administration].[User] ([Id])
GO
ALTER TABLE [Work].[Experience] CHECK CONSTRAINT [fk_Experience_User_UserId]
GO
ALTER TABLE [Work].[Job]  WITH CHECK ADD  CONSTRAINT [fk_Job_User_UserId] FOREIGN KEY([PublishedByUserId])
REFERENCES [Administration].[User] ([Id])
GO
ALTER TABLE [Work].[Job] CHECK CONSTRAINT [fk_Job_User_UserId]
GO
ALTER TABLE [Work].[JobApplication]  WITH CHECK ADD  CONSTRAINT [fk_JobApplications_AppliedByUserId] FOREIGN KEY([AppliedByUserId])
REFERENCES [Administration].[User] ([Id])
GO
ALTER TABLE [Work].[JobApplication] CHECK CONSTRAINT [fk_JobApplications_AppliedByUserId]
GO
ALTER TABLE [Work].[JobApplication]  WITH CHECK ADD  CONSTRAINT [fk_JobApplications_Job_JobId] FOREIGN KEY([JobId])
REFERENCES [Work].[Job] ([Id])
GO
ALTER TABLE [Work].[JobApplication] CHECK CONSTRAINT [fk_JobApplications_Job_JobId]
GO
ALTER TABLE [Work].[JobApplication]  WITH CHECK ADD  CONSTRAINT [fk_JobApplications_JobApplicationPhase_JobApplicationPhaseId] FOREIGN KEY([JobApplicationPhaseId])
REFERENCES [Work].[JobApplicationPhase] ([Id])
GO
ALTER TABLE [Work].[JobApplication] CHECK CONSTRAINT [fk_JobApplications_JobApplicationPhase_JobApplicationPhaseId]
GO
ALTER TABLE [Work].[JobSkills]  WITH CHECK ADD  CONSTRAINT [fk_JobSkills_Job_JobId] FOREIGN KEY([JobId])
REFERENCES [Work].[Job] ([Id])
GO
ALTER TABLE [Work].[JobSkills] CHECK CONSTRAINT [fk_JobSkills_Job_JobId]
GO
ALTER TABLE [Work].[JobSkills]  WITH CHECK ADD  CONSTRAINT [fk_JobSkills_Skill_SkillId] FOREIGN KEY([SkillId])
REFERENCES [Work].[Skill] ([Id])
GO
ALTER TABLE [Work].[JobSkills] CHECK CONSTRAINT [fk_JobSkills_Skill_SkillId]
GO
ALTER TABLE [Work].[UserSkills]  WITH CHECK ADD  CONSTRAINT [fk_UserSkill_Skill_SkillId] FOREIGN KEY([SkillId])
REFERENCES [Work].[Skill] ([Id])
GO
ALTER TABLE [Work].[UserSkills] CHECK CONSTRAINT [fk_UserSkill_Skill_SkillId]
GO
ALTER TABLE [Work].[UserSkills]  WITH CHECK ADD  CONSTRAINT [fk_UserSkill_User_UserId] FOREIGN KEY([UserId])
REFERENCES [Administration].[User] ([Id])
GO
ALTER TABLE [Work].[UserSkills] CHECK CONSTRAINT [fk_UserSkill_User_UserId]
GO
/****** Object:  StoredProcedure [Administration].[usp_Role_GetAll]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Administration].[usp_Role_GetAll]
AS
BEGIN
    SELECT r.Id,
           r.Name,
           r.Description
    FROM Administration.Role AS r;
END;

GO
/****** Object:  StoredProcedure [Administration].[usp_User_ChangeDescription]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Administration].[usp_User_ChangeDescription]
    @userId INT,
    @description NVARCHAR(1000)
AS
BEGIN
    UPDATE u
    SET u.Description = @description
    FROM Administration.[User] AS u
    WHERE u.Id = @userId;
END;

GO
/****** Object:  StoredProcedure [Administration].[usp_User_GetAccountDetails]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Administration].[usp_User_GetAccountDetails] @userId INT
AS
BEGIN
    SELECT u.Id,
           u.FirstName,
           u.LastName,
           u.Email,
           u.Description,
           u.RoleId,
           r.Name AS RoleName,
           u.IsActive,
           u.InsertDate,
           u.ProfilePic
    FROM Administration.[User] AS u
        LEFT OUTER JOIN Administration.Role AS r
            ON r.Id = u.RoleId
    WHERE u.Id = @userId;
END;





GO
/****** Object:  StoredProcedure [Administration].[usp_User_Login]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Administration].[usp_User_Login]
    @email NVARCHAR(200),
    @password NVARCHAR(500)
AS
BEGIN
    DECLARE @userId INT;
    DECLARE @userExists BIT;

	EXEC @userExists = Administration.fun_User_CheckIfUserExists @email = @email -- nvarchar(200)
	

    IF @userExists = 0
        THROW 51000, 'ERR_05', 1;



    SELECT @userId = u.Id
    FROM Administration.[User] AS u
    WHERE u.Email = @email
          AND u.Password LIKE HASHBYTES('SHA2_512', @password);

    IF (COALESCE(@userId, 0) = 0)
        THROW 51000, 'ERR_08', 1;

    SELECT *
    FROM Administration.vw_User_TokenAuthenticationInfo AS vutai
    WHERE vutai.Id = @userId;
END;
GO
/****** Object:  StoredProcedure [Administration].[usp_User_Register]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Administration].[usp_User_Register]
    @firstName NVARCHAR(100),
    @lastName NVARCHAR(100),
    @email NVARCHAR(200),
    @description NVARCHAR(1000),
    @roleId INT,
    @password NVARCHAR(500)
AS
BEGIN
    DECLARE @userExists BIT;
    DECLARE @userId INT;

    EXEC @userExists = Administration.fun_User_CheckIfUserExists @email = @email; -- nvarchar(200)


    IF @userExists = 1
        THROW 51000, 'ERR_04', 1;

    INSERT INTO Administration.[User]
    (
        FirstName,
        LastName,
        Email,
        Description,
        RoleId,
        IsActive,
        InsertDate,
        InsertBy,
        UpdateDate,
        UpdateBy,
        Password,
        ProfilePic
    )
    VALUES
    (   @firstName,                       -- FirstName - nvarchar(100)
        @lastName,                        -- LastName - nvarchar(100)
        @email,                           -- Email - nvarchar(200)
        @description,                     -- Description - nvarchar(1000)
        @roleId,                          -- RoleId - int
        1,                                -- IsActive - bit
        GETDATE(),                        -- InsertDate - date
        -1,                               -- InsertBy - int
        NULL,                             -- UpdateDate - date
        NULL,                             -- UpdateBy - int
        HASHBYTES('SHA2_512', @password), -- Password - nvarchar(500)
        CASE
            WHEN @roleId = 2 THEN
                'users/0.png'
            ELSE
                'users/1.jpg'
        END);

    SET @userId = SCOPE_IDENTITY();

    SELECT *
    FROM Administration.vw_User_TokenAuthenticationInfo AS vutai
    WHERE vutai.Id = @userId;
END;
GO
/****** Object:  StoredProcedure [App].[usp_Config_Get]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [App].[usp_Config_Get] @key VARCHAR(200)
AS
BEGIN
    SELECT c.Value
    FROM App.Config AS c
    WHERE c.[Key] = @key;
END;
GO
/****** Object:  StoredProcedure [App].[usp_Config_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [App].[usp_Config_Insert] @key VARCHAR(200), @value NVARCHAR(2000), @userId INT
AS
BEGIN
    INSERT INTO App.Config
    (
        [Key],
        Value,
        InsertDate,
        InsertBy,
        UpdateDate,
        UpdateBy
    )
    VALUES
    (   @key,      -- Key - varchar(200)
        @value,     -- Value - nvarchar(2000)
        GETDATE(), -- InsertDate - date
        @userId, -- InsertBy - int
        NULL,    -- UpdateDate - date
        NULL     -- UpdateBy - int
        )
END
GO
/****** Object:  StoredProcedure [App].[usp_ErrorsLog_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [App].[usp_ErrorsLog_Insert]
    @errorId VARCHAR(20),
    @userId INT
AS
BEGIN
    INSERT INTO App.ErrorsLog
    (
        ErrorId,
        InsertDate,
        InsertBy
    )
    VALUES
    (   @errorId,             -- ErrorId - varchar(20)
        GETDATE(),            -- InsertDate - date
        COALESCE(@userId, -1) -- InsertBy - int
        );
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_ResetData]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_ResetData]
AS
BEGIN
    TRUNCATE TABLE Work.Experience;
    TRUNCATE TABLE Work.JobSkills;
    TRUNCATE TABLE Work.Notification;
    TRUNCATE TABLE Work.UserSkills;
    TRUNCATE TABLE Work.JobApplication;
	DELETE FROM Work.Job
    DELETE FROM Administration.[User];
END;


GO
/****** Object:  StoredProcedure [dbo].[usp_test]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[usp_test] @tvpTest TvpJobTechnologies READONLY
AS
BEGIN
    SELECT * FROM @tvpTest AS tt
END
GO
/****** Object:  StoredProcedure [Work].[Job_GetUserJobs]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[Job_GetUserJobs] @userId INT
AS
BEGIN
    SELECT ja.JobId,
           j.Title AS JobTitle,
           j.Description AS JobDescription,
           u.ProfilePic AS PublisherProfilePic,
           ja.IsActive,
		   'He/She is an excellent dev' AS  EmployerComment
    FROM Work.JobApplication AS ja
        INNER JOIN Work.Job AS j
            ON j.Id = ja.JobId
		INNER JOIN Administration.[User] AS u ON u.Id = j.PublishedByUserId
    WHERE ja.JobApplicationPhaseId = 'Choosen'
          AND ja.AppliedByUserId = @userId;
END;

GO
/****** Object:  StoredProcedure [Work].[usp_Experience_DeleteForUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Experience_DeleteForUser] @experienceId INT
AS
BEGIN
    DECLARE @rowAffected TINYINT;

    DELETE e
    FROM Work.Experience AS e
    WHERE e.Id = @experienceId;

    SELECT @rowAffected = @@ROWCOUNT;

    IF @rowAffected <> 1
        THROW 51000, 'ERR_02', 1;
    ELSE
        SELECT CAST(1 AS BIT) AS Success;
END;

GO
/****** Object:  StoredProcedure [Work].[usp_Experience_GetForUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Experience_GetForUser] @userId INT
AS
BEGIN
    SELECT e.Id,
           e.WorkplaceName,
           e.Description,
           e.StartDate,
           e.EndDate
    FROM Work.Experience AS e
    WHERE e.UserId = @userId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Experience_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Work].[usp_Experience_Insert]
    @userId INT,
    @workplaceName NVARCHAR(500),
    @description NVARCHAR(1000),
    @startDate DATE,
    @endDate DATE = NULL
AS
BEGIN
    INSERT INTO Work.Experience
    (
        WorkplaceName,
        Description,
        UserId,
        StartDate,
        EndDate
    )
    VALUES
    (   @workplaceName, -- WorkplaceName - nvarchar(500)
        @description,   -- Description - nvarchar(1000)
        @userId,        -- UserId - int
        @startDate,     -- StartDate - date
        @endDate        -- EndDate - date
        );
END;

GO
/****** Object:  StoredProcedure [Work].[usp_Job_ByTitleAndSkill]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_ByTitleAndSkill]
    @title NVARCHAR(100) = NULL,
    @skillId INT = NULL
AS
BEGIN
    SELECT vjgi.Id,
           vjgi.Title,
           vjgi.PriceAmount,
           vjgi.IsActive,
           vjgi.Description,
           vjgi.InsertDate
    FROM Work.vw_JobGeneralInfo AS vjgi
        LEFT OUTER JOIN Work.JobSkills AS js
            ON js.JobId = js.Id
    WHERE js.SkillId = @skillId
          OR vjgi.Title = @title;


END;

GO
/****** Object:  StoredProcedure [Work].[usp_Job_ChangeJobStatus]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Work].[usp_Job_ChangeJobStatus]
    @userId INT,
    @jobId INT,
    @isActive BIT
AS
BEGIN
    DECLARE @exists INT;

    SELECT @exists = COUNT(*)
    FROM Work.Job AS j
    WHERE j.Id = @jobId;

    IF @exists <> 1
        THROW 51000, 'ERR_06', 1;


    UPDATE j
    SET j.IsActive = @isActive,
        j.UpdateDate = GETDATE(),
        j.UpdateBy = @userId
    FROM Work.Job AS j
    WHERE j.Id = @jobId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Job_Delete]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_Delete]
    @jobId INT
AS
BEGIN
    DECLARE @exists INT;

    SELECT @exists = COUNT(*)
    FROM Work.Job AS j
    WHERE j.Id = @jobId

    IF @exists <> 1
        THROW 51000, 'ERR_06', 1;


    DELETE j
    FROM Work.Job AS j
    WHERE j.Id = @jobId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Job_GetAll]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_GetAll]
AS
BEGIN
    SELECT vjgi.Id,
           vjgi.Title,
           vjgi.PriceAmount,
           vjgi.IsActive,
           vjgi.Description,
           vjgi.InsertDate
    FROM Work.vw_JobGeneralInfo AS vjgi
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Job_GetAnnouncedByUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Work].[usp_Job_GetAnnouncedByUser] @userId INT
AS
BEGIN
    SELECT j.Id,
           j.Title,
           j.PriceAmount,
           j.IsActive,
           j.Description,
           j.InsertDate
    FROM Work.Job AS j
    WHERE j.PublishedByUserId = @userId;

END;
GO
/****** Object:  StoredProcedure [Work].[usp_Job_GetBySkill]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_GetBySkill] @skillId INT
AS
BEGIN
    SELECT vjgi.Id,
           vjgi.Title,
           vjgi.PriceAmount,
           vjgi.IsActive,
           vjgi.Description,
           vjgi.InsertDate
    FROM Work.vw_JobGeneralInfo AS vjgi
        INNER JOIN Work.JobSkills AS js
            ON js.JobId = vjgi.Id
    WHERE js.SkillId = @skillId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Job_GetDetails]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_GetDetails] @jobId INT
AS
BEGIN
    SELECT j.Id,
           j.Title,
           j.Description,
           j.SourceCodeLink,
           j.EstimatedDays,
           j.ContactEmail,
           j.PublishedByUserId,
           u.FirstName AS PublishedByUserFirstName,
           u.LastName AS PublishedByUserLastName,
		   u.ProfilePic AS PublisherProfilePic,
           j.PriceAmount,
           j.IsActive -- as status
    FROM Work.Job AS j
        LEFT OUTER JOIN Administration.[User] AS u
            ON u.Id = j.PublishedByUserId
    WHERE j.Id = @jobId;

    IF (@@ROWCOUNT <> 1)
        THROW 51000, 'ERR_09', 1;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Job_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_Insert]
    @userId INT,
    @title NVARCHAR(500),
    @description NVARCHAR(2000),
    @sourceCodeLink NVARCHAR(2000) = NULL,
    @estimatedDays INT = NULL,
    @contactEmail NVARCHAR(200) = NULL,
    @priceAmount DECIMAL(10, 4) = NULL,
    @tvpJobSkills TvpJobSkills READONLY
AS
BEGIN
    DECLARE @jobId INT;

    BEGIN TRY
        BEGIN TRAN;
        INSERT INTO Work.Job
        (
            Title,
            Description,
            SourceCodeLink,
            EstimatedDays,
            ContactEmail,
            PublishedByUserId,
            PriceAmount,
            IsActive,
            InsertDate,
            InsertBy,
            UpdateDate,
            UpdateBy
        )
        VALUES
        (   @title,          -- Title - nvarchar(500)
            @description,    -- Description - nvarchar(2000)
            @sourceCodeLink, -- SourceCodeLink - nvarchar(2000)
            @estimatedDays,  -- EstimatedDays - int
            @contactEmail,   -- ContactEmail - nvarchar(200)
            @userId,         -- PublishedByUserId - int
            @priceAmount,    -- PriceAmonut - decimal(10, 4)
            1,               -- IsActive - bit
            GETDATE(),       -- InsertDate - date
            @userId,         -- InsertBy - int
            NULL,            -- UpdateDate - date
            NULL             -- UpdateBy - int
            );

        SELECT @jobId = SCOPE_IDENTITY();

        INSERT INTO Work.JobSkills
        (
            JobId,
            SkillId
        )
        SELECT @jobId,
               tjs.SkillId
        FROM @tvpJobSkills AS tjs;

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
        THROW 51000, 'ERR_07', 1;
    END CATCH;

END;

GO
/****** Object:  StoredProcedure [Work].[usp_Job_Update]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Job_Update]
    @userId INT,
    @jobId INT,
    @active BIT,
    @title NVARCHAR(500) = NULL,
    @description NVARCHAR(2000) = NULL,
    @sourceCodeLink NVARCHAR(2000) = NULL,
    @estimatedDays INT = NULL,
    @contactEmail NVARCHAR(200) = NULL,
    @priceAmount DECIMAL(10, 4) = NULL
AS
BEGIN
    UPDATE j
    SET j.Title = ISNULL(@title, j.Title),
        j.Description = ISNULL(@description, j.Description),
        j.SourceCodeLink = ISNULL(@sourceCodeLink, j.SourceCodeLink),
        j.EstimatedDays = ISNULL(@estimatedDays, j.EstimatedDays),
        j.ContactEmail = ISNULL(@contactEmail, j.ContactEmail),
        j.PriceAmount = ISNULL(@priceAmount, j.PriceAmount),
        j.IsActive = ISNULL(@active, j.IsActive),
        j.UpdateDate = GETDATE(),
        j.UpdateBy = @userId
    FROM Work.Job AS j
    WHERE j.Id = @jobId;

END;

GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_ChooseWinner]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_JobApplication_ChooseWinner]
    @userId INT,
    @jobApplicationId INT
AS
BEGIN
    DECLARE @jobId INT;
	DECLARE @jobTitle NVARCHAR(500);

    SELECT @jobId = ja.JobId
    FROM Work.JobApplication AS ja
    WHERE ja.Id = @jobApplicationId;

	SELECT @jobTitle = j.Title FROM Work.Job AS j WHERE j.Id = @jobId

    IF @jobId IS NULL
        THROW 51000, 'ERR_06', 1;


    BEGIN TRY
        BEGIN TRAN;
		-- update JobApplications
        UPDATE ja
        SET ja.JobApplicationPhaseId = CASE
                                           WHEN ja.Id = @jobApplicationId THEN
                                               'Choosen'
                                           ELSE
                                               'Rejected'
                                       END,
            ja.IsActive = 0
        FROM Work.JobApplication AS ja
        WHERE ja.JobId = @jobId;

		-- update job status
        UPDATE j
        SET j.IsActive = 0,
            j.UpdateBy = @userId,
            j.UpdateDate = GETDATE()
        FROM Work.Job AS j
        WHERE j.Id = @jobId;

		-- sent notifications to applicants
		DECLARE @notificationPic VARCHAR(100);
		SELECT @notificationPic = u.ProfilePic FROM Administration.[User] AS u WHERE u.Id = @userId
        INSERT INTO Work.Notification
        (
            UserId,
            NotificationTopicId,
            IsSent,
            IsRead,
            Message,
			Picture
        )
        SELECT ja.AppliedByUserId,
               CASE
                   WHEN ja.JobApplicationPhaseId = 'Choosen' THEN
                       'ApplicantApprove'
                   ELSE
                       'ApplicantRefuse'
               END,
               NULL,
               NULL,
               'Application of task ' + '"' + @jobTitle + '"' + ' is ' + ja.JobApplicationPhaseId,
			   @notificationPic
        FROM Work.JobApplication AS ja
        WHERE ja.JobId = @jobId;


        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;

        THROW 51000, 'ERR_01', 1;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_Delete]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Work].[usp_JobApplication_Delete]
    @userId INT,
    @jobId INT
AS
BEGIN
    DELETE ja
    FROM Work.JobApplication AS ja
    WHERE ja.AppliedByUserId = @userId
          AND ja.JobId = @jobId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_GetAnnouncedByUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_JobApplication_GetAnnouncedByUser] @userId INT
AS
BEGIN
    SELECT ja.Id,
           ja.JobId,
           j.Title AS JobTitle,
		   j.Description AS JobDescription,
		   u.ProfilePic AS PublisherProfilePic,
		   ja.AppliedByUserId AS ApplicantUserId,
		   u2.FirstName AS ApplicantFirstName,
		   u2.LastName AS ApplicantLastName,
           ja.Comment,
           ja.JobApplicationPhaseId,
           jap.Description AS JobApplicationPhaseDescription,
           ja.InsertDate,
           ja.IsActive
    FROM Work.JobApplication AS ja
        INNER JOIN Work.Job AS j
            ON j.Id = ja.JobId
        INNER JOIN Work.JobApplicationPhase AS jap
            ON jap.Id = ja.JobApplicationPhaseId
		INNER JOIN Administration.[User] AS u ON u.Id = j.PublishedByUserId
		INNER JOIN Administration.[User] AS u2 ON u2.Id = ja.AppliedByUserId
    WHERE j.PublishedByUserId = @userId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_GetByJobId]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_JobApplication_GetByJobId] @jobId INT
AS
BEGIN
    SELECT ja.Id,
           ja.JobId,
           j.Title AS JobTitle,
		   j.Description AS JobDescription,
		   u.ProfilePic AS PublisherProfilePic,
		   ja.AppliedByUserId AS ApplicantUserId,
		   u2.FirstName AS ApplicantFirstName,
		   u2.LastName AS ApplicantLastName,
           ja.Comment,
           ja.JobApplicationPhaseId,
           jap.Description AS JobApplicationPhaseDescription,
           ja.InsertDate,
           ja.IsActive
    FROM Work.JobApplication AS ja
        INNER JOIN Work.Job AS j
            ON j.Id = ja.JobId
        INNER JOIN Work.JobApplicationPhase AS jap
            ON jap.Id = ja.JobApplicationPhaseId
		INNER JOIN Administration.[User] AS u ON u.Id = j.PublishedByUserId
		INNER JOIN Administration.[User] AS u2 ON u2.Id = ja.AppliedByUserId
    WHERE j.Id = @jobId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_GetByUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_JobApplication_GetByUser] @userId INT
AS
BEGIN
    SELECT ja.Id,
           ja.JobId,
           j.Title AS JobTitle,
		   j.Description AS JobDescription,
		   u.ProfilePic AS PublisherProfilePic,
		   ja.AppliedByUserId AS ApplicantUserId,
		   u2.FirstName AS ApplicantFirstName,
		   u2.LastName AS ApplicantLastName,
           ja.Comment,
           ja.JobApplicationPhaseId,
           jap.Description AS JobApplicationPhaseDescription,
           ja.InsertDate,
           ja.IsActive
    FROM Work.JobApplication AS ja
        INNER JOIN Work.Job AS j
            ON j.Id = ja.JobId
        INNER JOIN Work.JobApplicationPhase AS jap
            ON jap.Id = ja.JobApplicationPhaseId
		INNER JOIN Administration.[User] AS u ON u.Id = j.PublishedByUserId
		INNER JOIN Administration.[User] AS u2 ON u2.Id = ja.AppliedByUserId
    WHERE ja.AppliedByUserId = @userId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_GetDetails]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Work].[usp_JobApplication_GetDetails] @applicationId INT
AS
BEGIN
    SELECT ja.Id,
           ja.JobId,
           j.Title AS JobTitle,
		   j.Description AS JobDescription,
		   u.ProfilePic AS PublisherProfilePic,
		   ja.AppliedByUserId AS ApplicantUserId,
		   u2.FirstName AS ApplicantFirstName,
		   u2.LastName AS ApplicantLastName,
           ja.Comment,
           ja.JobApplicationPhaseId,
           jap.Description AS JobApplicationPhaseDescription,
           ja.InsertDate,
           ja.IsActive
    FROM Work.JobApplication AS ja
        INNER JOIN Work.Job AS j
            ON j.Id = ja.JobId
        INNER JOIN Work.JobApplicationPhase AS jap
            ON jap.Id = ja.JobApplicationPhaseId
		INNER JOIN Administration.[User] AS u ON u.Id = j.PublishedByUserId
		INNER JOIN Administration.[User] AS u2 ON u2.Id = ja.AppliedByUserId
    WHERE ja.Id = @applicationId
END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobApplication_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_JobApplication_Insert]
    @userId INT,
    @jobId INT,
    @comment NVARCHAR(800)
AS
BEGIN
    DECLARE @jobPublisherUserId INT;
	DECLARE @jobName NVARCHAR(100);

    SELECT @jobPublisherUserId = j.PublishedByUserId,
	@jobName = j.Title
    FROM Work.Job AS j
    WHERE j.Id = @jobId;


    INSERT INTO Work.JobApplication
    (
        AppliedByUserId,
        JobId,
        IsActive,
        InsertDate,
        InsertBy,
        UpdateDate,
        UpdateBy,
        Comment,
        JobApplicationPhaseId
    )
    VALUES
    (   @userId,   -- AppliedByUserId - int
        @jobId,    -- JobId - int
        1,         -- IsActive - bit
        GETDATE(), -- InsertDate - date
        @userId,   -- InsertBy - int
        NULL,      -- UpdateDate - date
        NULL,      -- UpdateBy - int
        @comment,  -- Comment - nvarchar(800)
        'Waiting'  -- JobApplicationPhaseId - varchar(100)
        );


DECLARE @notificationPicture VARCHAR(100);
SELECT @notificationPicture = u.ProfilePic FROM Administration.[User] AS u WHERE u.Id = @userId
DECLARE @senderMsg NVARCHAR(1000) = 'You have successfully applied for task "' + @jobName + '"';
DECLARE @receiverMsg NVARCHAR(1000) = 'New job application for task "' + @jobName + '"';

EXEC Work.usp_Notification_Insert @toUserId = @jobPublisherUserId,             -- int
                                  @notificationTopicId = 'JobApply', -- varchar(100)
                                  @message = @receiverMsg,             -- nvarchar(1000)
								  @picture = @notificationPicture

EXEC Work.usp_Notification_Insert @toUserId = @userId,             -- int
                                  @notificationTopicId = 'JobApply', -- varchar(100)
                                  @message = @senderMsg,             -- nvarchar(1000)
								  @picture = @notificationPicture

END;
GO
/****** Object:  StoredProcedure [Work].[usp_JobSkills_GetJobRequiredSkills]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_JobSkills_GetJobRequiredSkills] @jobId INT
AS
BEGIN
    SELECT s.Id,
           s.Name,
           s.Description,
           s.Icon
    FROM Work.JobSkills AS js
        INNER JOIN Work.Skill AS s
            ON s.Id = js.SkillId
    WHERE js.JobId = @jobId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Notification_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Notification_Insert]
    @toUserId INT,
    @notificationTopicId VARCHAR(100),
    @message NVARCHAR(1000),
	@picture VARCHAR(100)
AS
BEGIN
    INSERT INTO Work.Notification
    (
        UserId,
        NotificationTopicId,
        IsSent,
        IsRead,
        Message,
		Picture,
        InsertDate
    )
    SELECT @toUserId,
           @notificationTopicId,
           NULL,
           NULL,
           @message,
		   @picture,
           GETDATE();
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Notifications_GetByUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_Notifications_GetByUser] @userId INT
AS
BEGIN
    SELECT n.Id,
           n.UserId,
           n.NotificationTopicId,
		   nt.Description AS NotificationTopicDescription,
           n.IsSent,
           n.IsRead,
           n.Message,
		   n.Picture,
           n.InsertDate
    FROM Work.Notification AS n
		LEFT JOIN Work.NotificationTopic AS nt ON nt.Id = n.NotificationTopicId
    WHERE n.UserId = @userId;
END;
GO
/****** Object:  StoredProcedure [Work].[usp_Skill_GetAll]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Work].[usp_Skill_GetAll]
AS
BEGIN
    SELECT s.Id,
           s.Name,
           s.Description,
           s.Icon FROM Work.Skill AS s
END
GO
/****** Object:  StoredProcedure [Work].[usp_UserSkill_Insert]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_UserSkill_Insert]
    @userId INT,
    @skillId INT
AS
BEGIN
    DECLARE @exists INT;

    SELECT @exists = COUNT(*)
    FROM Work.UserSkills AS us
    WHERE us.UserId = @userId
          AND us.SkillId = @skillId;

    IF @exists <> 0
        THROW 51000, 'ERR_03', 1;

    INSERT INTO Work.UserSkills
    (
        UserId,
        SkillId
    )
    VALUES
    (   @userId, -- UserId - int
        @skillId -- SkillId - int
        );
END;

GO
/****** Object:  StoredProcedure [Work].[usp_UserSkills_GetForUser]    Script Date: 8/29/2022 10:15:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Work].[usp_UserSkills_GetForUser] @userId INT
AS
BEGIN

    SELECT s.Id,
           s.Name,
           s.Description,
           s.Icon
    FROM Work.UserSkills AS us
        INNER JOIN Work.Skill AS s
            ON s.Id = us.SkillId
    WHERE us.UserId = @userId;
END;
GO
USE [master]
GO
ALTER DATABASE [PiWork] SET  READ_WRITE 
GO
