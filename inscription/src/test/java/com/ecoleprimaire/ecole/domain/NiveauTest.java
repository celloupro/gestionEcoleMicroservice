package com.ecoleprimaire.ecole.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ecoleprimaire.ecole.web.rest.TestUtil;

public class NiveauTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Niveau.class);
        Niveau niveau1 = new Niveau();
        niveau1.setId(1L);
        Niveau niveau2 = new Niveau();
        niveau2.setId(niveau1.getId());
        assertThat(niveau1).isEqualTo(niveau2);
        niveau2.setId(2L);
        assertThat(niveau1).isNotEqualTo(niveau2);
        niveau1.setId(null);
        assertThat(niveau1).isNotEqualTo(niveau2);
    }
}
