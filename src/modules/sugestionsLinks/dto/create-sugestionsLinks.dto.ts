import { ApiProperty } from "@nestjs/swagger";
import { IsUrl } from "class-validator";

export class CreateSugestionsLinks {
    @ApiProperty({
        description: "name of the store or marketplace that url refears",
        example: "Amazon"
    })
    name: string;
    @ApiProperty({
        description: "URL to redirect guest for the marketplace or store",
        example: "https://www.amazon.com.br/hz/mobile/mission?p=SiK5b9bDiSjLBtThpre49XZAVJbPhFt2ywCTtXe7dmmkloQwVcuR9BzrU%2FujpkDDNU14O%2Ff9zFf0da%2FIokK4mcaQeovisKrXS0%2BjecFBIEYZ6vp%2FqhnJA1B%2BB4of36h7ExRTA9afwIB7vAyu4epmUTafp6mzxMwB86wiR7WP6CycrbHxx1DIsccKfXFQ21CDIfzqCzPpS%2Fo1sN%2BatKgLxDp1%2BWiOJpReKZFUadgoXtsoD7%2BVaEjfu2VwVOuUwCzZ%2FuORY32GCSKrN6XluqnWuD%2FTTMnLtwVZrAdxzrDTeecCQK8MEwHOOFjE6k0bviXvlb9rSkqDisObdCwDmpb2p0DdNsiK3t0zgQ2sNh8raccGbWVqm1xyuqZ8EDPKSkuRpyHjtMmrRgW4yFf4Yk3PtZQwTCcGqVnpYt%2FNhFO%2BkR5R36l3%2F0za59vSwAxE2Nsf&ref_=nb_sb_ss_di_ci_mcx_mi_ci-mcx-ksf-of-nv1_0&crid=7Z7O0GYGBLUK"
    })
    @IsUrl()
    url: string;
}