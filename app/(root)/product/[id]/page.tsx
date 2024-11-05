import { Container, ProductImage, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ProductPageProps = {
    params: { id: string };
};

export default async function ProductPage({ params: { id } }: ProductPageProps) {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-10">
            <div className="flex flex-1">
                <ProductImage imageUrl={product.imageUrl} size={40} />

                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title text={product.name} size="md" className="font-extrabold mb-1" />
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, animi!
                    </p>

                    <GroupVariants
                        selectedValue="2"
                        items={[
                            {
                                name: "test 1",
                                value: "1",
                            },
                            {
                                name: "test 2",
                                value: "2",
                            },
                            {
                                name: "test 3",
                                value: "3",
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
