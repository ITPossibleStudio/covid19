import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ThemeInterface } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  preloaderGifUrl: Observable<string>;

  private defaultTheme: ThemeInterface = {
    name: 'crossMKG',
    colors: [
      {
        name: 'primary',
        value: '#E6968D' // $light-red
      },
      {
        name: 'secondary',
        value: '#FAEAE8' // $light-grey
      },
      {
        name: 'active',
        value: '#B86969' // $dark-red
      },
      {
        name: 'hover',
        value: 'rgba(250, 234, 232, 0.5)' // $dark-red
      },
      {
        name: 'fontPrimary',
        value: '#FFFFFF'
      },
      {
        name: 'fontSecondary',
        value: '#3C4650'
      }
    ]
  };

  private themes: Array<ThemeInterface> = [
    {
      name: 'crossMKG',
      colors: [
        {
          name: 'primary',
          value: '#E6968D' // $light-red
        },
        {
          name: 'secondary',
          value: '#FAEAE8' // $light-grey
        },
        {
          name: 'active',
          value: '#B86969' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(250, 234, 232, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossZMK',
      colors: [
        {
          name: 'primary',
          value: '#009485' // $light-red
        },
        {
          name: 'secondary',
          value: '#D8FEFA' // $light-grey
        },
        {
          name: 'active',
          value: '#02695F' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(216, 254, 250, 0.5)' // $dark-red

        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossCARE',
      colors: [
        {
          name: 'primary',
          value: '#5EA758' // $light-red
        },
        {
          name: 'secondary',
          value: '#91CB8C' // $light-grey
        },
        {
          name: 'active',
          value: '#338F2B' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(145, 203, 140, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossPPS',
      colors: [
        {
          name: 'primary',
          value: '#0D508E' // $light-red
        },
        {
          name: 'secondary',
          value: '#DDE9FF' // $light-grey
        },
        {
          name: 'active',
          value: '#0C467C' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(221, 233, 255, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossMED',
      colors: [
        {
          name: 'primary',
          value: '#DD5946' // $light-red
        },
        {
          name: 'secondary',
          value: '#FFD9D7' // $light-grey
        },
        {
          name: 'active',
          value: '#C04D3D' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(255, 217, 215, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossPARTCHILD',
      colors: [
        {
          name: 'primary',
          value: '#E1A465' // $light-red
        },
        {
          name: 'secondary',
          value: '#FFF1E2' // $light-grey
        },
        {
          name: 'active',
          value: '#D79830' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(255, 241, 226, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossSPZ',
      colors: [
        {
          name: 'primary',
          value: '#F39400' // $light-red
        },
        {
          name: 'secondary',
          value: '#FFEFE1' // $light-grey
        },
        {
          name: 'active',
          value: '#C87C05' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(255, 239, 225, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossDENT',
      colors: [
        {
          name: 'primary',
          value: '#748DC5' // $light-red
        },
        {
          name: 'secondary',
          value: '#D1FFFA' // $light-grey
        },
        {
          name: 'active',
          value: '#4B6295' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(209, 255, 250, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossPIA',
      colors: [
        {
          name: 'primary',
          value: '#BD8AAF' // $light-red
        },
        {
          name: 'secondary',
          value: '#FFE3FA' // $light-grey
        },
        {
          name: 'active',
          value: '#8A4978' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(255, 227, 250, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
    {
      name: 'crossMMS',
      colors: [
        {
          name: 'primary',
          value: '#4169E1' // $light-red
        },
        {
          name: 'secondary',
          value: '#DAE7FD' // $light-grey
        },
        {
          name: 'active',
          value: '#2E51BB' // $dark-red
        },
        {
          name: 'hover',
          value: 'rgba(218, 231, 253, 0.5)' // $dark-red
        },
        {
          name: 'fontPrimary',
          value: '#FFFFFF'
        },
        {
          name: 'fontSecondary',
          value: '#3C4650'
        }
      ]
    },
  ];

  private preloaderGifUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.defaultTheme.name);

  constructor(private http: HttpClient) {
    this.preloaderGifUrl = this.preloaderGifUrlSubject.asObservable();
  }

  // getThemeByProductName(): Observable<ThemeInterface> {
  //   return this.http.get(`${this.baseUrlService.environment.DelphiBaseUrl}/running-mode`).pipe(
  //     switchMap((settings: any) => {
  //       const theme = this.themes.find((theme: ThemeInterface) => theme.name === settings.mode);
  //
  //       if (theme) {
  //         this.preloaderGifUrlSubject.next(theme.name);
  //         return of(theme);
  //       } else {
  //         return of(this.defaultTheme);
  //       }
  //     })
  //   );
  // }

  setLoaderUrl(loaderUrl: string): void {
    this.preloaderGifUrlSubject.next(loaderUrl);
  }

}
