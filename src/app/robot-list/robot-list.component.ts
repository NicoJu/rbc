import {Component, OnInit, ViewChild} from '@angular/core';
import {Robot} from "../shared/robot/robot";
import {RobotService} from "../shared/robot/robot.service";
import {GiphyService} from "../shared/giphy/giphy.service";
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-robot-list',
  templateUrl: 'robot-list.component.html',
  styleUrls: ['robot-list.component.css']
})
export class RobotListComponent implements OnInit {

  displayedColumns = ['name', 'price' ,'edit'];
  dataSource: MatTableDataSource<Robot>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  robots: Observable<Robot[]>;

  constructor(private robotService: RobotService) {}

  ngOnInit() {
    this.robots = this.robotService.getAllRobot();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.robots.subscribe( data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  );


  }

}
