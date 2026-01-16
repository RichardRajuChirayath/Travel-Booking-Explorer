import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { DestinationService } from '../../services/destination.service';
import { Package } from '../../models/package.model';

@Component({
  selector: 'app-package-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink, RouterLinkActive, RouterOutlet, MatTabsModule, MatIconModule, MatChipsModule],
  templateUrl: './package-detail.html',
  styleUrl: './package-detail.css',
})
export class PackageDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private destinationService = inject(DestinationService);

  packageId = signal<string | null>(null);
  currentPackage = signal<Package | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.packageId.set(id);

    if (id) {
      this.destinationService.getPackageById(id).subscribe(pkg => {
        this.currentPackage.set(pkg);
      });
    }
  }
}
