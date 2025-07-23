// app/page.js
// vai redirecionar para /main
import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/main');
}
