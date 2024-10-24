import {
    Container,
    Filters,
    ProductCard,
    ProductsGroupList,
    Title,
} from "@/components/shared";
import { TopBar } from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="All Pizzas" size="lg" className="font-extrabold" />
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                title="Pizza 1"
                                categoryId={1}
                                items={[
                                    {
                                        id: 1,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 2,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 3,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 4,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 5,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 6,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                ]}
                            />
                            <ProductsGroupList
                                title="Pizza 2"
                                categoryId={2}
                                items={[
                                    {
                                        id: 1,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 2,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 3,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 4,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 5,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                    {
                                        id: 6,
                                        name: "Italy Pizza",
                                        imageUrl:
                                            "https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/cach_lam_banh_pizza_thom_ngon_chuan_nha_hang_2_43d4f180fd.png",
                                        price: 550,
                                        items: [{ price: 550 }],
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
