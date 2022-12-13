import './style.css';

enum BadgeStyle {
  red = 'red',
  blue = 'blue',
  green = 'green',
}

function badgeFactory(radius: number, x: number, y: number): Path2D {
  const badge = new Path2D();
  badge.arc(x, y, radius, 0, 2 * Math.PI);
  return badge;
}

function renderBadgeWithScore(
  ctx: CanvasRenderingContext2D,
  score: number,
  style: BadgeStyle
) {
  const badgeRadius = 10;
  const badgeX = 58;
  const badgeY = badgeX;
  const badgeScoreFontSize = badgeRadius;

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.beginPath();

  // rendering badge background..
  ctx.fillStyle = style;
  const badge = badgeFactory(badgeRadius, badgeX, badgeY);
  ctx.fill(badge);

  // rendering badge score
  ctx.fillStyle = 'white';
  ctx.font = `bold ${badgeScoreFontSize}px sans-serif`;
  ctx.fillText(score.toString(), badgeX, badgeY + 1);
}

function renderBackground(ctx: CanvasRenderingContext2D, logoUrl: string, cb: () => void) {
  const img = new Image();
  img.addEventListener('load', () => {
    ctx.drawImage(img, 0, 0, img.width, img.height, 6, 6, 60, 60);
    cb();
  });
  img.src = logoUrl;
}

function createBadge(mastoInstanceHost:string, score: number, style: BadgeStyle = BadgeStyle.red) {
  const canvas = document.createElement('canvas');
  canvas.width = 72;
  canvas.height = canvas.width;
  document.getElementById('app')?.appendChild(canvas);
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    renderBackground(ctx, `https://${mastoInstanceHost}/favicon.ico`, ()=> {
      renderBadgeWithScore(ctx, score, style);
    });  
  }
}

createBadge('piaille.fr', 10, BadgeStyle.red);
createBadge('piaille.fr', 0, BadgeStyle.green);
createBadge('mastodon.social', 3, BadgeStyle.green);
createBadge('mastodon.social', 99, BadgeStyle.red);
createBadge('mstdn.ca', 99, BadgeStyle.blue);

