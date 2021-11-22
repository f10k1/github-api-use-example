import UserModel from '../models/UserModel'
import beAxios from '@/axios';
export default class getUser {
    public async getAllUsers(name: string, page: number, sort: string, order: string): Promise<UserModel[]> {
        return (await beAxios(`/search/users?q=${name}&per_page=9&page=${page}&sort=${sort}&order=${order}`,
            {
                params: {
                    format: 'json'
                },
            }
        )).data["items"];
    }
    public async getUser(name: string): Promise<UserModel> {
        return (await beAxios("/users/" + name,
            {
                params: {
                    format: 'json'
                },
            })).data;
    }
}