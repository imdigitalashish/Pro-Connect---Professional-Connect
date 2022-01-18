import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class LogService {
    logData(data: any) {
        if (environment.isLogging) {
            console.log(Date() + "\n" + data);

        }
    }
}