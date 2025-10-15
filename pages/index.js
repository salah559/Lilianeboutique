import Header from '../components/Header';
export default function Home(){
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-brandGold">Lilian Boutique</h2>
          <p className="mt-4 text-white/80">ملابس نساء و اطفال — ذهبي، أنيق، عصري.</p>
        </section>
      </main>
    </>
  );
}