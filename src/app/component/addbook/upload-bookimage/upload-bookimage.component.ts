import { Component, OnInit, Inject } from "@angular/core";
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { BookService } from "src/app/shared/service/book.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-upload-bookimage",
  templateUrl: "./upload-bookimage.component.html",
  styleUrls: ["./upload-bookimage.component.scss"],
})
export class UploadBookimageComponent implements OnInit {
  bookcode;
  imageForm: FormGroup;
  fileUpload = { status: "", message: "", filePath: "" };
  constructor(
    public dialogRef: MatDialogRef<UploadBookimageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookService: BookService,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.bookcode = this.data.bookCode;
  }

  ngOnInit() {
    this.imageForm = this.formBuilder.group({
      name: [""],
      imageFile: [""],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      this.imageForm.get("imageFile").setValue(imageFile);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("imageFile", this.imageForm.get("imageFile").value);

    // this.imageForm.controls["image"].value;
    this.bookService
      .uploadBookImage(
        this.data.bookId,
        this.imageForm.controls["imageFile"].value,
        formData
      )
      .subscribe(
        (message) => {
          this.fileUpload = message;
          this.snackbar.open(" Book Image Uploaded Successfully", "ok", {
            duration: 4000,
          });
          this.dialogRef.close(1);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
