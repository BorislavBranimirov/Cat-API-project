import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

export const mockServer = setupServer(
  ...[
    http.get('https://api.thecatapi.com/v1/images', () => {
      return HttpResponse.json([
        {
          id: '1',
          url: 'test-image-url',
        },
      ]);
    }),
    http.post('https://api.thecatapi.com/v1/favourites', () => {
      return HttpResponse.json({
        id: 1,
      });
    }),
    http.delete('https://api.thecatapi.com/v1/favourites/1', () => {
      return new HttpResponse(null);
    }),
  ],
);
