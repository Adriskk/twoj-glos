import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AppRepository } from './app.repository';
import { CreateProjectDto } from './dtos/create-project.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { create } from 'domain';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = await this.encryptData(createUserDto.password);
    createUserDto.isGov = false;
    createUserDto.theme = 'light';
    return await this.appRepository.createUser(createUserDto);
  }

  async createProject(createProjectDto: CreateProjectDto) {
    createProjectDto.isApproved = false;
    createProjectDto.votes = 0;
    createProjectDto.city = createProjectDto.city.toLowerCase();
    if (createProjectDto.userId == -1 || !createProjectDto.userId)
      throw new UnauthorizedException('Nie jesteś zalogowany!');
    return await this.appRepository.createProject(createProjectDto);
  }

  async deleteUser(userId: number) {
    return await this.appRepository.deleteUser(userId);
  }

  async deleteProject(projectId: number) {
    return await this.appRepository.deleteProject(projectId);
  }

  async approveProject(projectId: number) {
    return await this.appRepository.approveProject(projectId);
  }

  async fetchProjects(city, phrase) {
    const projects = await this.appRepository.fetchProjects(city, phrase);
    return projects.map((project) => {
      const coords = { lat: Number(project.lat), lng: Number(project.lng) };
      delete project.lng, project.lat;
      return { ...project, coords };
    });
  }

  async fetchUserProjects(userId: number) {
    const userProjects = await this.appRepository.fetchUserProjects(userId);
    const data = [];

    const getProject = async (projectId) => {
      return new Promise(async (resolve, reject) => {
        resolve(await this.appRepository.fetchProject(projectId, userId));
      });
    };

    for (const userProject of userProjects) {
      data.push(await getProject(userProject.projectId));
    }

    return data.map((dataset) => {
      const coords = {
        lat: Number(dataset.project.lat),
        lng: Number(dataset.project.lng),
      };

      delete dataset.project.lng, dataset.project.lat;

      return {
        ...dataset?.project,
        ...dataset?.voted,
        coords,
      };
    });
  }

  async fetchProject(projectId: number, userId: number) {
    const data = await this.appRepository.fetchProject(projectId, userId);
    const coords = {
      lat: Number(data.project.lat),
      lng: Number(data.project.lng),
    };
    delete data.project.lng, data.project.lat;
    return {
      ...data.project,
      coords,
      voted: data.voted,
      isAuthor: data.isAuthor,
    };
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const res = await this.appRepository.userLogin(loginUserDto);
    const isMatch = await bcrypt.compare(loginUserDto.password, res.password);
    delete res.password;
    if (isMatch == true) {
      if (res) {
        const censor_phone = res.phone.split('');
        for (let i = 4; i < res.phone.length - 2; i++) {
          if (censor_phone[i] == ' ') {
            i++;
          }
          censor_phone[i] = '*';
        }
        res.phone = censor_phone.join('');
      }
    } else {
      throw new UnauthorizedException('Błędny login lub hasło!');
    }

    return res;
  }

  async projectVote(projectId: number, userId: number) {
    return await this.appRepository.projectVote(projectId, userId);
  }

  async getSettings(userId: number) {
    return await this.appRepository.getSettings(userId);
  }

  async saveSettings(userId: number, theme: string) {
    return await this.appRepository.saveSettings(userId, theme);
  }

  async encryptData(string: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(string, saltOrRounds);
  }
}
