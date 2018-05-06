import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {RobotService} from "../shared/robot/robot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GiphyService} from "../shared/giphy/giphy.service";
import {Subscription} from 'rxjs/Subscription';
import {Robot} from "../shared/robot/robot";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-robot-edit',
  templateUrl: './robot-edit.component.html',
  styleUrls: ['./robot-edit.component.css']
})
export class RobotEditComponent implements OnInit, OnDestroy {

  sub: Subscription;
  robot: Robot = new Robot();

  constructor(private robotService: RobotService,
              private route: ActivatedRoute,
              private router: Router,
              private  giphyService: GiphyService,
              public dialog: MatDialog) {
  }


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.robotService.getRobotById(id).subscribe(
          robot => {

            if (robot) {
              this.robot = robot;
              this.giphyService.get(robot.name).subscribe(url => robot.giphyUrl = url);
            } else {
              this.gotoList();
            }

          }
        )
      }
    });
  }

  gotoList() {
    this.router.navigate(['/robot-list']);
  }

  save(robot: Robot) {
    this.robotService.addRobot(robot).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  edit(robot: Robot) {
    this.robotService.addRobot(robot).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(id: string) {
    this.robotService.deleteRobot(id).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  confirmDelete() : void {
    let dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
  }

}

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any)

  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



