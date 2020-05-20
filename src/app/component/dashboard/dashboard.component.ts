import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/shared/service/user.service";
import { BookService } from "src/app/shared/service/book.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  private param: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private bookService: BookService
  ) {
    if (
      localStorage.isLogin === undefined &&
      localStorage.isLogin == null &&
      sessionStorage.userId === undefined &&
      sessionStorage.userId == null
    ) {
      sessionStorage.setItem(
        "userId",
        Math.floor(Math.random() * (8888 - 1111) + 1111).toString()
      );
    }
  }

  ngOnInit() {
    // tslint:disable-next-line:radix
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.setQueryParam();
    this.bookService.autoRefresh$.subscribe(() => {
      this.id = this.route.snapshot.paramMap.get("id");
      console.log(this.id);
      this.setQueryParam();
    });
  }
  setQueryParam() {
    console.log("setArchiveNotes");
    this.userService.setQueryParam(this.id);
  }
}
