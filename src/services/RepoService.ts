import RepoModel from '../models/RepoModel'
import beAxios from '@/axios';
export default class RepoService {
    public async getAllRepos(name: string, sort: string, order: string, page: number): Promise<RepoModel[]> {
        return (await beAxios(`/search/repositories?q=${name}&per_page=9&page=${page}&sort=${sort}&order=${order}`,
            {
                params: {
                    format: 'json'
                },
            }
        )).data["items"];
    }
    public async getUserRepos(name: string, page: number, sort: string, direction: string): Promise<RepoModel[]> {
        return (await beAxios(`/users/${name}/repos?per_page=6&page=${page}&sort=${sort}&direction=${direction}`,
            {
                params: {
                    format: 'json'
                },
            })).data;
    }
    public async getRepo(owner: string, name: string): Promise<RepoModel> {
        return (await beAxios(`/repos/${owner}/${name}`,
            {
                params: {
                    format: 'json'
                }
            })).data;
    }
}