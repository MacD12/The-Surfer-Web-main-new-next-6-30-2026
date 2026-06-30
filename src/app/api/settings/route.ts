// Stub endpoint at /api/settings.
//
// Nothing in this codebase requests it - but several browser extensions
// (e.g. some password managers, color pickers, dev-tool overlays) probe
// for a /api/settings route on every site they're injected into. Without
// this stub, Next.js dev mode lazily compiles a 404 page on the first
// extension probe, which takes ~5s and pollutes the dev console.
//
// Returning {} with a long cache header stops the probing loop, keeps the
// dev log clean, and is a no-op for real visitors (the URL isn't linked
// or fetched from any first-party code).
export const dynamic = 'force-static';

export function GET() {
  return new Response('{}', {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=86400, immutable',
    },
  });
}
