import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { create } from 'domain';
import { LoginUserDto } from './dtos/login-user.dto';
import { log } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class AppRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const isExisting = await this.prismaService.users.findMany({
      where: {
        OR: [
          { email: createUserDto.email },
          { phone: createUserDto.phone },
          { pesel: createUserDto.pesel },
        ],
      },
    });
    if (isExisting.length < 1) {
      const user = await this.prismaService.users.create({
        data: {
          email: createUserDto.email,
          password: createUserDto.password,
          city: createUserDto.city,
          pesel: createUserDto.pesel,
          name: createUserDto.name,
          surname: createUserDto.surname,
          phone: createUserDto.phone,
          isGov: createUserDto.isGov,
          theme: createUserDto.theme,
        },
      });
      if (!user) {
        throw new Error('Wystąpił błąd przy rejestracji!');
      } else return { status: 'Success!', user };
    } else
      throw new UnauthorizedException('Podane dane są już zarejestrowane!');
  }

  async createProject(createProjectDto) {
    createProjectDto.userId = parseInt(String(createProjectDto.userId));
    const user = await this.prismaService.users.findUnique({
      where: { id: createProjectDto.userId },
      select: { name: true, surname: true },
    });

    createProjectDto.author = String(user.name + ' ' + user.surname);

    const project = await this.prismaService.projects.create({
      data: {
        title: createProjectDto.title,
        author: createProjectDto.author,
        cost: createProjectDto.cost,
        votes: createProjectDto.votes,
        project_size: createProjectDto.project_size,
        city: createProjectDto.city,
        localization: createProjectDto.localization,
        description: createProjectDto.description,
        isApproved: createProjectDto.isAproved,
        additional_information: createProjectDto.additional_information,
        lat: createProjectDto.coords.lat,
        lng: createProjectDto.coords.lng,
      },
    });
    if (!project) {
      return { status: 'Failed!' };
    } else {
      await this.prismaService.userProjects.create({
        data: {
          userId: parseInt(String(createProjectDto.userId)),
          projectId: project.id,
        },
      });
      return { status: 'Success', project };
    }
  }

  async deleteUser(userId: number) {
    const id = parseInt(String(userId));
    await this.prismaService.users.delete({
      where: { id },
    });
    await this.prismaService.votedProjects.deleteMany({
      where: { userId: id },
    });
    await this.prismaService.userProjects.deleteMany({
      where: { userId: id },
    });
    return { status: 'Success' };
  }

  async deleteProject(projectId: number) {
    const id = parseInt(String(projectId));
    await this.prismaService.projects.delete({
      where: { id },
    });
    await this.prismaService.votedProjects.deleteMany({
      where: { projectId: id },
    });
    await this.prismaService.userProjects.deleteMany({
      where: { projectId: id },
    });
    return { status: 'Success' };
  }

  async approveProject(projectId: number) {
    const id = parseInt(String(projectId));
    await this.prismaService.projects.update({
      where: { id },
      data: {
        isApproved: true,
      },
    });
  }

  async fetchProjects(city, phrase) {
    if (phrase == '') {
      return await this.prismaService.projects.findMany({
        where: { city },
      });
    } else {
      return await this.prismaService.projects.findMany({
        where: { city, title: { search: phrase } },
      });
    }
  }

  async fetchProject(projectId: number, userId: number) {
    const id = parseInt(String(projectId));
    userId = parseInt(String(userId));
    projectId = parseInt(String(projectId));
    let isVoted = [];
    if (userId) {
      isVoted = await this.prismaService.votedProjects.findMany({
        where: {
          projectId: id,
          userId,
        },
      });
    }

    let isAuthorArr = [];
    if (userId) {
      isAuthorArr = await this.prismaService.userProjects.findMany({
        where: {
          userId,
          projectId,
        },
      });
    }

    let isAuthor = false;

    let voted = false;

    if (isVoted.length > 0) voted = true;

    console.log(isAuthorArr);

    if (isAuthorArr.length > 0) isAuthor = true;

    return {
      project: await this.prismaService.projects.findFirst({
        where: { id },
      }),
      voted: voted,
      isAuthor: isAuthor,
    };
  }

  async fetchUserProjects(userId: number) {
    userId = parseInt(String(userId));
    return await this.prismaService.userProjects.findMany({
      where: { userId },
    });
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.users.findMany({
      where: {
        OR: [
          { email: loginUserDto.login },
          { phone: loginUserDto.login || null },
        ],
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        phone: true,
        city: true,
        password: true,
      },
    });
    if (user.length == 0)
      throw new NotFoundException('Błędny login lub hasło!');
    return user[0];
  }

  async projectVote(projectid: number, userid: number) {
    const projectId = parseInt(String(projectid));
    const userId = parseInt(String(userid));

    const isVoted = await this.prismaService.votedProjects.findMany({
      where: {
        projectId,
        userId,
      },
    });

    if (isVoted.length > 0)
      throw new UnauthorizedException('Oddałeś już głos na ten projekt!');

    await this.prismaService.projects.update({
      where: { id: projectId },
      data: { votes: { increment: 1 } },
    });

    await this.prismaService.votedProjects.create({
      data: {
        userId,
        projectId,
      },
    });

    return { status: 'Success' };
  }

  async getSettings(userId: number) {
    const id = parseInt(String(userId));
    return this.prismaService.users.findUnique({
      where: { id },
      select: { theme: true },
    });
  }

  async saveSettings(userId: number, theme: string) {
    const id = parseInt(String(userId));
    const userUpdate = await this.prismaService.users.update({
      where: { id: id },
      data: { theme: theme },
    });

    return { status: 'success' };
  }
}
