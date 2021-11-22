import UserModel from "./UserModel";

export default class RepoModel {
    public id!: number;
    public name!: string;
    public owner!: UserModel;
    public html_url!: string;
    public description!: string;
    public languages_url!: string;
    public contributors_url!: string;
    public created_at!: string;
    public updated_at!: string;
    public fork!: boolean;
    public commits_url!: string;
    public stargazers_count!: number;
    public open_issues_count!: number;
    public forks_count!: number;
}