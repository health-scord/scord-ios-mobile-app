mkdir -p app/components/ui/$1
sed -e "s/GenComponent/$1/g" bash/gen_ui_component/GenComponent.tsx > app/components/ui/$1/$1.tsx
sed -e "s/GenComponent/$1/g" bash/gen_ui_component/GenComponent.scss > app/components/ui/$1/$1.scss
sed -e "s/GenComponent/$1/g" bash/gen_ui_component/GenComponent.d.ts > app/components/ui/$1/$1.d.ts
sed -e "s/GenComponent/$1/g" bash/gen_ui_component/GenComponent.spec.tsx > app/components/ui/$1/$1.spec.tsx
sed -e "s/GenComponent/$1/g" bash/gen_ui_component/GenComponent.stories.tsx > app/components/ui/$1/$1.stories.tsx