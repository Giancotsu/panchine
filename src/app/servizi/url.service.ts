import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public localhost="http://localhost:9000"
  public remotehost="https://panchine.duckdns.org:8080"
  //public remotehost="https://panchine.up.railway.app"
  //public remotehost="https://93.48.62.240:8080"


}
