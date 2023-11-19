import { HttpHeaders } from "@angular/common/http";

export function createSecretHeader(): HttpHeaders {
  return new HttpHeaders({
    'X-App-Key': 'secret' // TODO - needs to be changed to a real key and moved to environment.ts
  });
}
