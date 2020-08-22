import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PrintService {
  isPrinting = false;
  constructor(private router: Router) {}

  printInvoice(documentName: string) {
    this.router.navigate([
      "/",
      {
        outlets: {
          print: ["print", documentName],
        },
      },
    ]);
  }
}
