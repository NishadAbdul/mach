import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  documents: any = [
    {
      name: 'National or Iqama Copy',
      uploaded: false,
      file_name: 'true-jinu.pdf',
      identifier: '1'
    }, {
      name: 'Passport Copy',
      uploaded: false,
      file_name: '',
      identifier: '2'
    },{
      name: 'GAT - Genral Aptitude Test',
      uploaded: true,
      file_name: 'gat.pdf',
      identifier: '3'
    }
  ]
  documentCount: number = 0;
  touched: boolean = false;
  typeInvalid: any = {};
  sizeInvalid: any = {};
  uploading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public router: Router) {

  }

  deleteDocument(identifier: string) {
    
  }

  confirmDelete(doc: any): void {
    const message = `Are you sure you want to delete the document ${doc?.fileName}?`;
    const dialogData = new ConfirmDialogModel("Please Confirm", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.deleteDocument(doc?.identifier);
      }
    });
  }

  initiateUpload(event: any, identifier: string) {
    const files = event.target.files;
    this.uploadDocument(files, identifier);
    event.target.value = null;
  }

  uploadDocument(files: any, identifier: string) {
    this.sizeInvalid[identifier] = false;
    this.typeInvalid[identifier] = false;
    this.uploading = true;
    const maxSize = this.checkMaximumFileSize(files);
    const type = this.supportedFileType(files);
    if (maxSize && type) {
      const formData = new FormData();
      let document = files[0];
      formData.append('file', document);
    /*  this.documentService.uploadDocuments(formData, identifier).subscribe((event: any) => {
        this.uploading = false;
        const updatedDoc = [...this.documents];
        updatedDoc.map((data: any) => {
          if (data.identifier === identifier) {
            data.uploaded = true;
            data.fileName = document.name;
          }
        })
        this.documentCount--;
        this.documents = updatedDoc;
      });*/
    } else {
      if (!maxSize)
        this.sizeInvalid[identifier] = true;
      if (!type) {
        this.typeInvalid[identifier] = true
      }
    }

  }

  saveAndNext() {
    if (this.documentCount === 0) {
      this.router.navigateByUrl('/home/applications/')
    } else {
      this.touched = true;
      this.sizeInvalid = {};
      this.typeInvalid = {};
    }
  }

  checkMaximumFileSize(file: File[]) {
    const fileSize = file[0].size;
    const fileSizeInMB = Math.round(fileSize / 1024);
    if (fileSizeInMB >= 15000) {
      return false
    } else {
      return true;
    }
  }

  supportedFileType(file: File[]) {
    const fileTypes: string[] = ['PDF', 'XLS', 'XLSX', 'DOC', 'DOCX', 'JPEG', 'PNG', 'GIF', 'JPG']
    const name = file[0].name;
    const lastDot = name.lastIndexOf('.');
    const ext = name.substring(lastDot + 1);
    const valid = fileTypes.filter((type: string) => { return type === ext.toUpperCase() })
    return valid.length > 0;
  }
}
