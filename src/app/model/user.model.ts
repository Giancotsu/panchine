export class User{
  private username:string;
  private password:string;
  private token:string;
  private exp:Date;
  private role:string;

  public getUsername():string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getPassword():string {
    return this.password;
  }

  public setPassword(password:string):void {
    this.password = password;
  }

  public getToken():string {
    if(new Date() < this.exp){
      return this.token;
    }else{
      return "";
    }
  }

  public setToken(token:string):void {
    this.token = token;
  }

  public getExp():Date {
    return this.exp;
  }

  public setExp(exp:Date):void {
    this.exp = exp;
  }

  public getRole():string {
    return this.role;
  }

  public setRole(role: string): void {
    this.role = role;
  }
}
