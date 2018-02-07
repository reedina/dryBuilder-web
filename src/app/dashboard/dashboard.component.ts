import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

      lineData: any;
  
      barData: any;
  
      pieData: any;
  
      donutData: any;
    
  
      ngOnInit() {
          this.lineData = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                  {
                      label: 'Azure Kubernetes',
                      data: [25,30 , 45, 65, 77, 85, 104],
                      fill: false,
                      borderColor: '#03A9F4'
                  },
                  {
                      label: 'AWS Kubernetes',
                      data: [28, 48, 60, 80, 96, 110, 125],
                      fill: false,
                      borderColor: '#FFC107'
                  }
              ]
          };
  
          this.barData = {
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                  {
                      label: 'Azure Costs',
                      backgroundColor: '#03A9F4',
                      borderColor: '#03A9F4',
                      data: [51000, 47000, 50000, 51000, 56000, 65000, 70000]
                  },
                  {
                      label: 'AWS Costs',
                      backgroundColor: '#FFC107',
                      borderColor: '#FFC107',
                      data: [48000, 49000, 44000, 48000, 56000, 47000, 60000]
                  }
              ]
          };
  
          this.pieData = {
              labels: ['Toolkit', 'MAS', 'Backlog Prioritizing'],
              datasets: [
                  {
                      data: [300, 50, 100],
                      backgroundColor: [
                          '#FFC107',
                          '#03A9F4',
                          '#4CAF50'
                      ],
                      hoverBackgroundColor: [
                          '#FFE082',
                          '#81D4FA',
                          '#A5D6A7'
                      ]
                  }]
              };

              this.donutData = {
                labels: ['Project 1', 'Project 2', 'Project 3'],
                datasets: [
                    {
                        data: [100, 60, 90],
                        backgroundColor: [
                            '#FFC107',
                            '#03A9F4',
                            '#4CAF50'
                        ],
                        hoverBackgroundColor: [
                            '#FFE082',
                            '#81D4FA',
                            '#A5D6A7'
                        ]
                    }]
                };              
  

  
       
      }            
            
}