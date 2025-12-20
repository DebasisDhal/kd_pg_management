import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-common',
  imports: [RouterLink],
  templateUrl: './common.html',
  styleUrl: './common.css',
})
export class Common {

  exportLocalStorage() {
  const data = {
    users: JSON.parse(localStorage.getItem('userData') || '[]'),
    payments: JSON.parse(localStorage.getItem('kd_payment') || '[]'),
    exportDate: new Date().toISOString()
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kd_pg_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();

  window.URL.revokeObjectURL(url);
}

importLocalStorage(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result as string);

      // overwrite or restore
      localStorage.setItem('userData', JSON.stringify(data.users || []));
      localStorage.setItem('kd_payment', JSON.stringify(data.payments || []));

      alert('Data imported successfully. Please refresh.');
      location.reload();
    } catch (e) {
      alert('Invalid backup file');
    }
  };

  reader.readAsText(file);
}


}
