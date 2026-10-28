export interface C2PAMetadata {
  fileName: string;
  title: string;
  tagline: string;
  duration: string;
  creationDate: string;
  creationTool: string;
  containsAiGenerated: string;
  digitalSourceType: string;
  xmpAttribId: string;
  c2paClaimId: string;
  c2paInstanceId: string;
  videoCodec: string;
  h264Profile: string;
  muxingLibrary: string;
  aspectRatio: string;
  description: string;
  chapters: {
    time: string;
    seconds: number;
    title: string;
    description: string;
  }[];
  posterUrl: string;
  previewVideoUrl?: string;
}

export type SpicyLevel = 'sin_picante' | 'suave' | 'medio' | 'fuego' | 'fuego_extremo';

export type CandyCategory =
  | 'vasos_locos'
  | 'enchilados'
  | 'botanas_picantes'
  | 'tamarindos'
  | 'dulces_mexicanos'
  | 'combos_desembalaje';

export interface DessertItem {
  id: string;
  name: string;
  category: CandyCategory;
  description: string;
  longDescription?: string;
  price: number; // in COP (Colombian Pesos)
  weightOrQuantity: string;
  spicyLevel: SpicyLevel;
  imageUrl: string;
  popular?: boolean;
  isMexicanOriginal?: boolean;
  rating: number;
  reviewsCount: number;
  ingredients: string[];
  tags: string[];
}

export interface BoxPresentation {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  accentColor: string;
  imageUrl: string;
}

export interface BoxCustomization {
  boxType: BoxPresentation;
  selectedDesserts: {
    item: DessertItem;
    quantity: number;
  }[];
  spicyLevel: SpicyLevel;
  extraToppings: {
    id: string;
    name: string;
    price: number;
    icon: string;
    selected: boolean;
  }[];
  greetingCard: {
    recipient: string;
    sender: string;
    occasion: string;
    message: string;
    stickerTheme: 'fuego' | 'antojo' | 'chimba' | 'cumple';
  };
  destinationNeighborhood: string;
  isSecretSurprise: boolean;
}

export interface CartItem {
  id: string;
  type: 'dessert' | 'custom_box';
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  details?: string;
  spicyLevel?: SpicyLevel;
  customBoxData?: BoxCustomization;
}

export interface DeliveryOrder {
  orderId: string;
  customerName: string;
  customerPhone: string;
  recipientName: string;
  deliveryAddress: string;
  neighborhood: string;
  notes: string;
  items: CartItem[];
  total: number;
  spicyPreference: SpicyLevel;
  status: 'preparando' | 'empacando' | 'en_camino' | 'entregado';
  courierName: string;
  courierPhone: string;
  estimatedMinutes: number;
}
