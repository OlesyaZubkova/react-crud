const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
  }));

  const notes = [
	{
		id: "1",
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	}
];

const router = new Router();

router.get('/notes', async (ctx, next) => {
    ctx.response.body = JSON.stringify(notes);
  });

  router.post('/notes', async(ctx, next) => {
	notes.push(JSON.parse(ctx.request.body));
	ctx.response.status = 204;
});

router.delete('/notes/:id', async(ctx, next) => {
	const index = notes.findIndex(o => o.id === ctx.params.id);

	if (index !== -1) {
			notes.splice(index, 1);
	}

	ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));