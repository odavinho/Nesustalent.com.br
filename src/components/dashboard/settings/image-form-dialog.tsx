'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { addImageAction, updateImageAction } from '@/app/actions';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  id: z.string().min(3, 'O ID deve ter pelo menos 3 caracteres.'),
  imageUrl: z.string().url('Deve ser um URL de imagem válido.'),
  description: z.string().min(3, 'A descrição é obrigatória.'),
  imageHint: z.string().min(2, 'A dica para IA é obrigatória.'),
});

type FormValues = z.infer<typeof formSchema>;

interface ImageFormDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  item: ImagePlaceholder | null;
  itemType: 'parceiro' | 'certificação';
  idPrefix: 'partner-' | 'cert-';
}

export function ImageFormDialog({ isOpen, setIsOpen, item, itemType, idPrefix }: ImageFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isEditing = !!item;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      imageUrl: '',
      description: '',
      imageHint: '',
    },
  });

  useEffect(() => {
    if (item) {
      form.reset(item);
    } else {
      form.reset({
        id: `${idPrefix}`,
        imageUrl: '',
        description: '',
        imageHint: '',
      });
    }
  }, [item, form, idPrefix, isOpen]);
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = isEditing ? await updateImageAction(data) : await addImageAction(data);
      if (result.success) {
        toast({ title: 'Sucesso!', description: result.message });
        setIsOpen(false);
      } else {
        toast({ variant: 'destructive', title: 'Erro', description: result.message });
      }
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Ocorreu um erro inesperado.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? `Editar ${itemType}` : `Adicionar Novo ${itemType}`}</DialogTitle>
          <DialogDescription>Preencha as informações abaixo.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID Único</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: partner-empresa-x" {...field} readOnly={isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Imagem</FormLabel>
                  <FormControl>
                    <Input placeholder="https://exemplo.com/logo.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (alt text)</FormLabel>
                  <FormControl>
                    <Input placeholder="Logotipo da Empresa X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageHint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dica para IA (1-2 palavras)</FormLabel>
                  <FormControl>
                    <Input placeholder="tech logo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancelar</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? 'Salvar Alterações' : 'Adicionar Item'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
