'use client';

import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  Check,
  ChevronRight,
  ArrowLeft,
  Image as ImageIcon,
  LayoutDashboard,
  Package,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Settings,
  ShoppingBag,
  Store,
  Trash2,
  X,
} from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { Product } from '@/types';

type AdminSection = 'overview' | 'products' | 'homepage';

const emptyProduct: Product = {
  id: '',
  name: '',
  slug: '',
  category: 'suplementos',
  objective: 'masa',
  price: 0,
  rating: 5,
  reviewsCount: 0,
  image: '',
  description: '',
  benefits: [],
  inStock: true,
};

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100';

export default function AdminPage() {
  const { content, updateContent, resetContent } = useCMS();
  const [section, setSection] = useState<AdminSection>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => {
    const inStock = content.products.filter(product => product.inStock).length;
    const bundles = content.products.filter(product => product.category === 'bundles').length;
    return { total: content.products.length, inStock, bundles };
  }, [content.products]);

  const showSaved = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const saveProduct = (product: Product) => {
    const products = content.products.some(item => item.id === product.id)
      ? content.products.map(item => (item.id === product.id ? product : item))
      : [...content.products, product];
    updateContent({ products });
    setEditingProduct(null);
    showSaved();
  };

  const deleteProduct = (id: string) => {
    if (!window.confirm('¿Eliminar este producto del catálogo?')) return;
    updateContent({ products: content.products.filter(product => product.id !== id) });
    showSaved();
  };

  const duplicateProduct = (product: Product) => {
    const copy = {
      ...product,
      id: `${product.id}-copia-${Date.now()}`,
      slug: `${product.slug}-copia`,
      name: `${product.name} (copia)`,
    };
    updateContent({ products: [...content.products, copy] });
    showSaved();
  };

  const navItems: { id: AdminSection; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'homepage', label: 'Página de inicio', icon: Store },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-neutral-950 text-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-black">B</div>
          <div>
            <div className="font-black tracking-tight">BARK<span className="text-red-500">.PE</span></div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Panel CMS</div>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                  section === item.id ? 'bg-red-600 text-white' : 'text-neutral-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto p-4">
          <a href="/" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-neutral-400 hover:bg-white/10 hover:text-white">
            <ShoppingBag className="h-4 w-4" />
            Ver tienda
          </a>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-black text-red-700">AD</div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold">Administrador</p>
              <p className="truncate text-[10px] text-neutral-500">Control total</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/90 px-5 backdrop-blur-md sm:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-600">BARK Commerce</p>
            <h1 className="text-xl font-black tracking-tight sm:text-2xl">
              {navItems.find(item => item.id === section)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="hidden items-center gap-1.5 text-xs font-bold text-emerald-600 sm:flex">
                <Check className="h-4 w-4" /> Cambios guardados
              </span>
            )}
            <a href="/" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-bold hover:border-red-300 hover:text-red-600">
              <ArrowLeft className="h-4 w-4" /> <span>Regresar a la tienda</span>
            </a>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-5 sm:p-8">
          {section === 'overview' && (
            <Overview stats={stats} onNavigate={setSection} />
          )}
          {section === 'products' && (
            <ProductsSection
              products={content.products}
              editingProduct={editingProduct}
              onBack={() => setSection('overview')}
              onEdit={setEditingProduct}
              onDelete={deleteProduct}
              onDuplicate={duplicateProduct}
              onSave={saveProduct}
              onCancel={() => setEditingProduct(null)}
            />
          )}
          {section === 'homepage' && (
            <HomepageSection
              messages={content.announcementMessages}
              slides={content.heroSlides}
              onBack={() => setSection('overview')}
              onSave={updates => {
                updateContent(updates);
                showSaved();
              }}
              onReset={() => {
                resetContent();
                showSaved();
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function Overview({
  stats,
  onNavigate,
}: {
  stats: { total: number; inStock: number; bundles: number };
  onNavigate: (section: AdminSection) => void;
}) {
  const cards = [
    { label: 'Productos publicados', value: stats.total, icon: Package, color: 'bg-red-50 text-red-600' },
    { label: 'Disponibles en stock', value: stats.inStock, icon: BarChart3, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Combos activos', value: stats.bundles, icon: ShoppingBag, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-neutral-950 p-6 text-white shadow-xl sm:p-8">
        <div className="max-w-2xl">
          <span className="rounded-full bg-red-600/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-400">Centro de control</span>
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Haz crecer BARK desde un solo lugar.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
            Administra tu catálogo, promociones y contenido de portada sin tocar código. Los cambios se reflejan en la tienda al instante.
          </p>
          <button onClick={() => onNavigate('products')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-black hover:bg-red-500">
            Gestionar productos <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}><Icon className="h-5 w-5" /></div>
              <p className="text-3xl font-black">{card.value}</p>
              <p className="mt-1 text-xs font-bold text-neutral-500">{card.label}</p>
            </div>
          );
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <button onClick={() => onNavigate('products')} className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm hover:border-red-300">
          <span><Package className="mb-3 h-5 w-5 text-red-600" /><strong className="block text-sm">Catálogo</strong><small className="text-xs text-neutral-500">Precios, stock, imágenes y categorías</small></span>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </button>
        <button onClick={() => onNavigate('homepage')} className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm hover:border-red-300">
          <span><Settings className="mb-3 h-5 w-5 text-red-600" /><strong className="block text-sm">Contenido de portada</strong><small className="text-xs text-neutral-500">Banners, titulares y anuncios</small></span>
          <ChevronRight className="h-5 w-5 text-neutral-400" />
        </button>
      </div>
    </div>
  );
}

function ProductsSection({
  products,
  editingProduct,
  onBack,
  onEdit,
  onDelete,
  onDuplicate,
  onSave,
  onCancel,
}: {
  products: Product[];
  editingProduct: Product | null;
  onBack: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onDuplicate: (product: Product) => void;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [query, setQuery] = useState('');
  const filtered = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));

  if (editingProduct) {
    return <ProductEditor product={editingProduct} onSave={onSave} onCancel={onCancel} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button onClick={onBack} className="mb-2 inline-flex items-center gap-2 text-xs font-black text-neutral-500 hover:text-red-600">
            <ArrowLeft className="h-4 w-4" /> Regresar al resumen
          </button>
          <p className="text-sm text-neutral-500">Administra precios, inventario, promociones e imágenes.</p>
        </div>
        <button onClick={() => onEdit({ ...emptyProduct, id: `producto-${Date.now()}`, slug: `producto-${Date.now()}` })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-black text-white hover:bg-red-700"><Plus className="h-4 w-4" /> Nuevo producto</button>
      </div>
      <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar producto..." className={`${inputClass} max-w-md`} />
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1fr_120px_120px_130px_120px] gap-4 border-b border-neutral-100 bg-neutral-50 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-neutral-500 sm:grid">
          <span>Producto</span><span>Precio</span><span>Stock</span><span>Categoría</span><span>Acciones</span>
        </div>
        {filtered.map(product => (
          <div key={product.id} className="grid gap-3 border-b border-neutral-100 p-4 last:border-0 sm:grid-cols-[1fr_120px_120px_130px_120px] sm:items-center sm:gap-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                {product.image ? <img src={product.image} alt="" className="h-full w-full object-cover" /> : <ImageIcon className="m-3 h-6 w-6 text-neutral-400" />}
              </div>
              <div className="min-w-0"><p className="truncate text-sm font-black">{product.name}</p><p className="truncate text-[11px] text-neutral-500">{product.id}</p></div>
            </div>
            <p className="text-sm font-black">S/. {product.price.toFixed(2)}</p>
            <p className={`text-xs font-bold ${product.inStock ? 'text-emerald-600' : 'text-red-600'}`}>{product.inStock ? `${product.stockLeft ?? '∞'} disponibles` : 'Agotado'}</p>
            <p className="text-xs font-bold capitalize text-neutral-500">{product.category}</p>
            <div className="flex gap-1">
              <button onClick={() => onEdit(product)} aria-label="Editar" className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => onDuplicate(product)} aria-label="Duplicar" className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"><Plus className="h-4 w-4" /></button>
              <button onClick={() => onDelete(product.id)} aria-label="Eliminar" className="rounded-lg p-2 text-neutral-500 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductEditor({ product, onSave, onCancel }: { product: Product; onSave: (product: Product) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState(product);
  const update = (updates: Partial<Product>) => setDraft(previous => ({ ...previous, ...updates }));
  const currentVariant = draft.variants?.[0];
  const variantName = currentVariant?.name ?? (draft.category === 'suplementos' ? 'Sabor' : 'Opción');
  const variantOptions = currentVariant?.options.join(', ') ?? '';
  const updateVariant = (name: string, optionsText: string) => {
    const options = optionsText
      .split(',')
      .map(option => option.trim())
      .filter(Boolean);
    update({
      variants: [{ name: name.trim() || 'Opción', options }],
    });
  };
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between"><div><button onClick={onCancel} className="mb-2 text-xs font-bold text-neutral-500 hover:text-red-600">← Volver al catálogo</button><h2 className="text-2xl font-black">{product.name ? 'Editar producto' : 'Nuevo producto'}</h2></div><button onClick={() => onSave(draft)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-black text-white hover:bg-red-700"><Save className="h-4 w-4" /> Guardar cambios</button></div>
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <Field label="Nombre del producto"><input className={inputClass} value={draft.name} onChange={e => update({ name: e.target.value })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Precio (S/.)"><input type="number" className={inputClass} value={draft.price} onChange={e => update({ price: Number(e.target.value) })} /></Field><Field label="Precio anterior (opcional)"><input type="number" className={inputClass} value={draft.originalPrice ?? ''} onChange={e => update({ originalPrice: e.target.value ? Number(e.target.value) : undefined })} /></Field></div>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Categoría"><select className={inputClass} value={draft.category} onChange={e => { const category = e.target.value as Product['category']; update({ category, variants: category === 'suplementos' ? draft.variants : undefined }); }}><option value="suplementos">Suplementos</option><option value="accesorios">Accesorios</option><option value="bundles">Combos</option></select></Field><Field label="Objetivo"><select className={inputClass} value={draft.objective} onChange={e => update({ objective: e.target.value as Product['objective'] })}><option value="masa">Masa muscular</option><option value="definir">Definición</option><option value="fuerza">Fuerza</option><option value="energia">Energía</option></select></Field></div>
          <Field label="Descripción"><textarea rows={4} className={inputClass} value={draft.description} onChange={e => update({ description: e.target.value })} /></Field>
          <div className="grid gap-4 sm:grid-cols-2"><Field label="Etiqueta promocional"><input className={inputClass} value={draft.badge ?? ''} onChange={e => update({ badge: e.target.value || undefined })} placeholder="MÁS VENDIDO" /></Field><Field label="Stock disponible"><input type="number" className={inputClass} value={draft.stockLeft ?? ''} onChange={e => update({ stockLeft: e.target.value ? Number(e.target.value) : undefined })} /></Field></div>
          {draft.category === 'suplementos' && <div className="rounded-2xl border border-red-100 bg-red-50/50 p-4">
            <div className="mb-3">
              <h3 className="text-sm font-black">Sabores y variantes</h3>
              <p className="mt-1 text-xs text-neutral-500">Agrega las opciones que el cliente podrá elegir antes de añadir al carrito.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre de la variante">
                <input
                  className={inputClass}
                  value={variantName}
                  onChange={e => updateVariant(e.target.value, variantOptions)}
                  placeholder="Sabor"
                />
              </Field>
              <Field label="Opciones separadas por comas">
                <input
                  className={inputClass}
                  value={variantOptions}
                  onChange={e => updateVariant(variantName, e.target.value)}
                  placeholder="Chocolate, Vainilla, Cookies & Cream"
                />
              </Field>
            </div>
            {currentVariant && currentVariant.options.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currentVariant.options.map(option => (
                  <span key={option} className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-red-700 shadow-sm">
                    {option}
                  </span>
                ))}
              </div>
            )}
          </div>}
        </div>
        <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"><Field label="URL de imagen"><input className={inputClass} value={draft.image} onChange={e => update({ image: e.target.value })} placeholder="https://..." /></Field><div className="aspect-square overflow-hidden rounded-xl bg-neutral-100">{draft.image ? <img src={draft.image} alt="Vista previa" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-neutral-400">Sin imagen</div>}</div><label className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-3 text-xs font-bold"><input type="checkbox" checked={draft.inStock} onChange={e => update({ inStock: e.target.checked })} className="h-4 w-4 accent-red-600" /> Producto visible y disponible</label></div>
      </div>
    </div>
  );
}

function HomepageSection({ messages, slides, onBack, onSave, onReset }: { messages: string[]; slides: import('@/data/cms').CmsHeroSlide[]; onBack: () => void; onSave: (updates: { announcementMessages?: string[]; heroSlides?: import('@/data/cms').CmsHeroSlide[] }) => void; onReset: () => void }) {
  const [draftMessages, setDraftMessages] = useState(messages);
  const [draftSlides, setDraftSlides] = useState(slides);
  const updateSlide = (index: number, updates: Partial<(typeof slides)[number]>) => setDraftSlides(previous => previous.map((slide, slideIndex) => slideIndex === index ? { ...slide, ...updates } : slide));
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <button onClick={onBack} className="mb-2 inline-flex items-center gap-2 text-xs font-black text-neutral-500 hover:text-red-600">
            <ArrowLeft className="h-4 w-4" /> Regresar al resumen
          </button>
          <p className="text-sm text-neutral-500">Edita los mensajes de venta y banners visibles en la tienda.</p>
        </div>
        <div className="flex gap-2"><button onClick={onReset} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-xs font-black hover:border-red-300"><RotateCcw className="h-4 w-4" /> Restablecer</button><button onClick={() => onSave({ announcementMessages: draftMessages, heroSlides: draftSlides })} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-black text-white hover:bg-red-700"><Save className="h-4 w-4" /> Publicar cambios</button></div>
      </div>
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"><h2 className="mb-1 text-base font-black">Barra de anuncios</h2><p className="mb-4 text-xs text-neutral-500">Estos mensajes rotan en la parte superior de la tienda.</p><div className="space-y-3">{draftMessages.map((message, index) => <div key={index} className="flex gap-2"><input className={inputClass} value={message} onChange={e => setDraftMessages(previous => previous.map((item, itemIndex) => itemIndex === index ? e.target.value : item))} /><button onClick={() => setDraftMessages(previous => previous.filter((_, itemIndex) => itemIndex !== index))} className="rounded-xl p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600"><X className="h-4 w-4" /></button></div>)}</div><button onClick={() => setDraftMessages(previous => [...previous, 'Nuevo mensaje promocional'])} className="mt-4 inline-flex items-center gap-2 text-xs font-black text-red-600"><Plus className="h-4 w-4" /> Agregar mensaje</button></section>
      <section className="space-y-4"><h2 className="text-base font-black">Banners principales</h2>{draftSlides.map((slide, index) => <div key={slide.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><div><span className="text-[10px] font-black uppercase tracking-widest text-red-600">Banner {index + 1}</span><h3 className="mt-1 text-sm font-black">{slide.title}</h3></div><ImageIcon className="h-5 w-5 text-neutral-300" /></div><div className="grid gap-4 md:grid-cols-2"><Field label="Etiqueta"><input className={inputClass} value={slide.tag} onChange={e => updateSlide(index, { tag: e.target.value })} /></Field><Field label="URL de imagen"><input className={inputClass} value={slide.image} onChange={e => updateSlide(index, { image: e.target.value })} /></Field><Field label="Título"><textarea rows={3} className={inputClass} value={slide.title} onChange={e => updateSlide(index, { title: e.target.value })} /></Field><Field label="Subtítulo"><textarea rows={3} className={inputClass} value={slide.subtitle} onChange={e => updateSlide(index, { subtitle: e.target.value })} /></Field></div></div>)}</section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-[11px] font-black uppercase tracking-wider text-neutral-500">{label}</span>{children}</label>;
}
